import { h } from "preact";
import { PostMedia, supportedMediaTypes } from "../PostMedia";
import { PostDetails } from "../PostDetails";
import styles from "./styles.module.css";

export function MainContent({ activePost }) {
  return (
    <div className={styles.mainContent}>
      {supportedMediaTypes.includes(activePost.postType) && (
        <PostMedia post={activePost} />
      )}
      <PostDetails post={activePost} />
    </div>
  );
}
