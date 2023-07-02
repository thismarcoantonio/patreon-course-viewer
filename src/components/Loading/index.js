import { h } from "preact";
import styles from "./styles.module.css";

export function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingTitle}>Patreon Course Viewer</div>
      <div className={styles.loadingIcon}>
        <div className={styles.loadingIconDot} />
        <div className={styles.loadingIconDot} />
        <div className={styles.loadingIconDot} />
        <div className={styles.loadingIconDot} />
      </div>
    </div>
  );
}
