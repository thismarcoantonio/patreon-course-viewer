import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Loading } from "./components/Loading";
import { PostList } from "./components/PostList";
import { PostMedia, supportedMediaTypes } from "./components/PostMedia";
import { PostDetails } from "./components/PostDetails";
import { getPosts } from "./services/posts";

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activePostId, setActivePostId] = useState(null);
  const activePost = posts.find((post) => post.id === activePostId);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { posts } = await getPosts();
      setPosts(posts);
      setActivePostId(posts[1].id);
      setLoading(false);
    })();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="patreon-course-viewer">
      {activePost && (
        <div className="patreon-course-viewer__content">
          {supportedMediaTypes.includes(activePost.postType) && (
            <PostMedia post={activePost} />
          )}
          <PostDetails post={activePost} />
        </div>
      )}
      <PostList posts={posts} setActivePostId={setActivePostId} />
    </div>
  );
}

export default App;
