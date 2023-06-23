import { h } from "preact";
import cn from "classnames";
import styles from "./styles.module.css";

export function Image({ src, alt, title, className }) {
  return (
    <div className={cn(styles.image, className)}>
      <img
        src={src}
        alt={alt}
        title={title}
        className={cn(styles.imageSource)}
      />
    </div>
  );
}
