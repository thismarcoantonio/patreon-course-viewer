import { h } from "preact";

export function PostDetails({ post }) {
  return (
    <div className="patreon-course-viewer__details">
      <h2>{post.title}</h2>
      <p>{post.date}</p>
      <p>{post.content}</p>
    </div>
  );
}
