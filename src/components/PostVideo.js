import { h } from "preact";

export function PostVideo({ post }) {
  return (
    <div className="patreon-course-viewer__video">
      <img
        className="patreon-course-viewer__video-thumbnail"
        src={post.thumbnail}
        alt={post.title}
      />
    </div>
  );
}
