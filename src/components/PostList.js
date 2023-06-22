import { h } from "preact";

export function PostList({ posts = [], setActivePostId }) {
  const handlePostSelect = (post) => () => {
    setActivePostId(post.id);
  };

  return (
    <ul className="patreon-course-viewer__list">
      {posts.map((post) => (
        <li
          className="patreon-course-viewer__list-item"
          onClick={handlePostSelect(post)}
          key={post.id}
        >
          {(post.thumbnail || post.image || post.metaImage) && (
            <img
              width="100px"
              src={post.thumbnail?.square || post.image || post.metaImage}
              alt={post.title}
            />
          )}
          <div>{post.title}</div>
          <input type="checkbox" />
        </li>
      ))}
    </ul>
  );
}
