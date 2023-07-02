import { h } from "preact";
import { usePosts } from "../../hooks/Posts";
import styles from "./styles.module.css";

export function PostDetails() {
  const { activePost } = usePosts();

  return (
    <div className={styles.postDetails}>
      <h2 className={styles.postDetailsTitle}>{activePost.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: activePost.content }} />
    </div>
  );
}
