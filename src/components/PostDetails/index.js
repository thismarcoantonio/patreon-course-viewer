import { h } from "preact";
import styles from "./styles.module.css";

export function PostDetails({ post }) {
  return (
    <div className={styles.postDetails}>
      <h2 className={styles.postDetailsTitle}>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
