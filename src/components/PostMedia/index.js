import { h } from "preact";
import { POST_TYPES } from "../../services/posts";
import { PostVideo } from "./PostVideo";
import { PostEmbed } from "./PostEmbed";
import styles from "./styles.module.css";

export const supportedMediaTypes = [
  POST_TYPES.VIDEO_EXTERNAL_FILE,
  POST_TYPES.VIDEO_EMBED,
];

export function PostMedia({ post }) {
  return (
    <div className={styles.postMedia}>
      {post.postType === POST_TYPES.VIDEO_EXTERNAL_FILE && (
        <PostVideo key={post.id} video={post.file.url} />
      )}
      {post.postType === POST_TYPES.VIDEO_EMBED && (
        <PostEmbed embed={post.embed} />
      )}
    </div>
  );
}
