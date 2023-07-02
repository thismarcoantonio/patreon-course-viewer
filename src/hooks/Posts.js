import { h, createContext } from "preact";
import { useEffect, useState, useContext } from "preact/hooks";
import { getPosts } from "../services/posts";
import { togglePostCompleted } from "../utils/posts";
import storage from "../utils/localStorage";

const PostsContext = createContext({});

export function PostsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState({});
  const [activePostId, setActivePostId] = useState(null);

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
      setActivePostId(posts[0].id);
      setLoading(false);
    })();
  }, []);

  const toggleWatched = (postId) => {
    const state = togglePostCompleted(postId);
    setPosts({ ...posts, [postId]: { ...posts[postId], watched: state } });
  };

  return (
    <PostsContext.Provider
      value={{
        loading,
        posts: Object.values(posts),
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
