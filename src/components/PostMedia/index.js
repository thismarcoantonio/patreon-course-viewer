import { h } from "preact";
import { usePosts } from "../../hooks/Posts";
import { POST_TYPES } from "../../services/posts";
import { PostVideo } from "./PostVideo";
import { PostEmbed } from "./PostEmbed";
import styles from "./styles.module.css";

export const supportedMediaTypes = [
  POST_TYPES.VIDEO_EXTERNAL_FILE,
  POST_TYPES.VIDEO_EMBED,
];

export function PostMedia() {
  const { activePost } = usePosts();

  return (
    <div className={styles.postMedia}>
      {activePost.postType === POST_TYPES.VIDEO_EXTERNAL_FILE && (
        <PostVideo key={activePost.id} video={activePost.file.url} />
      )}
      {activePost.postType === POST_TYPES.VIDEO_EMBED && (
        <PostEmbed embed={activePost.embed} />
      )}
    </div>
  );
}
