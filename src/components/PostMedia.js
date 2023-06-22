import { h } from "preact";
import { POST_TYPES } from "../services/posts";
import { PostVideo } from "./PostVideo";
import { PostEmbed } from "./PostEmbed";

export const supportedMediaTypes = [
  POST_TYPES.VIDEO_EXTERNAL_FILE,
  POST_TYPES.VIDEO_EMBED,
];

export function PostMedia({ post }) {
  return (
    <div className="patreon-course-viewer__video">
      {post.postType === POST_TYPES.VIDEO_EXTERNAL_FILE && (
        <PostVideo video={post.file.url} />
      )}
      {post.postType === POST_TYPES.VIDEO_EMBED && (
        <PostEmbed embed={post.embed} />
      )}
    </div>
  );
}
