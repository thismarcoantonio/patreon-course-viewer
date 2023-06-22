import { h } from "preact";

export function PostList({ posts, setActivePost }) {
  const handlePostSelect = (post) => () => {
    setActivePost(post);
  };

  return (
    <ul className="patreon-course-viewer__list">
      {posts.map((post, index) => (
        <li
          className="patreon-course-viewer__list-item"
          onClick={handlePostSelect(post)}
          key={index}
        >
          {post.thumbnail && (
            <img width="40%" src={post.thumbnail} alt={post.title} />
          )}
          <div>
            {post.title}
            Published at: {post.date}
          </div>
          <input type="checkbox" />
        </li>
      ))}
    </ul>
  );
}
