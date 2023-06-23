import { h } from "preact";
import styles from "./styles.module.css";

export function PostEmbed({ embed }) {
  return (
    <div
      className={styles.postMediaEmbed}
      dangerouslySetInnerHTML={{ __html: embed }}
    />
  );
}
