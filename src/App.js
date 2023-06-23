import { h } from "preact";
import { useEffect, useState, useMemo } from "preact/hooks";
import { Loading } from "./components/Loading";
import { MainContent } from "./components/MainContent";
import { PostList } from "./components/PostList";
import { getPosts } from "./services/posts";
import { getCampaign } from "./services/campaign";
import { togglePostCompleted } from "./utils/posts";
import storage from "./utils/localStorage";

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState({});
  const [activePostId, setActivePostId] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const activePost = useMemo(() => posts[activePostId], [activePostId]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { posts } = await getPosts();
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
      setActivePostId(posts[1].id);

      const campaign = await getCampaign();
      setCampaign(campaign);

      setLoading(false);
    })();
  }, []);

  const setPostWatched = (postId) => {
    const state = togglePostCompleted(postId);
    setPosts({ ...posts, [postId]: { ...posts[postId], watched: state } });
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="patreon-course-viewer">
      {activePost && (
        <MainContent activePost={activePost} campaign={campaign} />
      )}
      <PostList
        posts={posts}
        activePostId={activePostId}
        setActivePostId={setActivePostId}
        setPostWatched={setPostWatched}
      />
    </div>
  );
}

export default App;
