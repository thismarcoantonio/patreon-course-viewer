import { h } from "preact";
import { Loading } from "./components/Loading";
import { MainContent } from "./components/MainContent";
import { PostList } from "./components/PostList";
import { usePosts } from "./hooks/Posts";

function App() {
  const { loading, activePost } = usePosts();

  return loading ? (
    <Loading />
  ) : (
    <div className="patreon-course-viewer">
      {activePost && <MainContent />}
      <PostList />
    </div>
  );
}

export default App;
