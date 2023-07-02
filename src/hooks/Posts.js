import { h, createContext } from "preact";
import { useEffect, useState, useContext, useMemo } from "preact/hooks";
import { getPosts } from "../services/posts";
import { togglePostCompleted } from "../utils/posts";
import { useTags } from "./Tags";
import storage from "../utils/localStorage";

const PostsContext = createContext({});

export function PostsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState({});
  const [activePostId, setActivePostId] = useState(null);
  const { activeTag } = useTags();

  const filteredPosts = useMemo(() => {
    const postList = Object.values(posts);
    if (!activeTag) return postList;
    return postList.filter((post) => post.tags.includes(activeTag));
  }, [activeTag, posts]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const posts = await getPosts();
      const postProgress = storage.get(storage.KEYS.PROGRESS) || {};
      setPosts(
        posts.reduce(
          (result, post) => ({
            ...result,
            [post.id]: { ...post, watched: !!postProgress[post.id] },
          }),
          {}
        )
      );
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (filteredPosts.length) {
      const firstWatchedPost = filteredPosts.find((post) => !post.watched);
      setActivePostId(
        firstWatchedPost ? firstWatchedPost.id : filteredPosts[0].id
      );
    }
  }, [filteredPosts]);

  const toggleWatched = (postId) => {
    const state = togglePostCompleted(postId);
    setPosts({ ...posts, [postId]: { ...posts[postId], watched: state } });
  };

  return (
    <PostsContext.Provider
      value={{
        loading,
        posts: filteredPosts,
        toggleWatched,
        setActivePost: setActivePostId,
        activePost: posts[activePostId],
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);
