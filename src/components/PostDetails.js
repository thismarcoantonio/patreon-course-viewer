import { h } from "preact";

export function PostDetails({ post }) {
  return (
    <div className="patreon-course-viewer__details">
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
