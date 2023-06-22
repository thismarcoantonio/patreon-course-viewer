import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Loading } from "./components/Loading";
import { PostList } from "./components/PostList";
import { PostVideo } from "./components/PostVideo";
import { PostDetails } from "./components/PostDetails";

let loadInterval;
let intervalTime = 300;

function App() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState({});

  const loadPosts = () => {
    const content = document.getElementById("renderPageContentWrapper");
    const isFetchingNewPosts = document.querySelector(
      "[aria-label='loading more posts']"
    );
    if (isFetchingNewPosts) return;

    const pageButtons = Array.from(content.querySelectorAll("button"));
    const loadMoreButton = pageButtons.find(
      (button) => button.textContent === "Load more"
    );

    if (!isFetchingNewPosts && !loadMoreButton) {
      clearInterval(loadInterval);
      setLoading(false);
      const posts = Array.from(content.querySelectorAll("[data-tag=post-card]"))
        .reverse()
        .map((post) => ({
          title: post.querySelector("[data-tag=post-title]").textContent,
          date: post.querySelector("[data-tag=post-published-at]").textContent,
          content: post.querySelector("[data-tag=post-content-collapse]")
            ?.textContent,
          thumbnail: post.querySelector("[data-tag=media-container] img")?.src,
        }));
      setPosts(posts);
      setActivePost(posts[0]);
      return;
    }

    loadMoreButton.click();
    setPage((page) => page + 1);
  };

  useEffect(() => {
    setLoading(true);
    loadInterval = setInterval(loadPosts, intervalTime);
    return () => {
      clearInterval(loadInterval);
    };
  }, []);

  return loading ? (
    <Loading page={page} />
  ) : (
    <div className="patreon-course-viewer">
      <div className="patreon-course-viewer__content">
        {activePost.thumbnail && <PostVideo post={activePost} />}
        <PostDetails post={activePost} />
      </div>
      <PostList posts={posts} setActivePost={setActivePost} />
    </div>
  );
}

export default App;
