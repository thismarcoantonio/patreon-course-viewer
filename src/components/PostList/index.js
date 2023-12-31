import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import cn from "classnames";
import { usePosts } from "../../hooks/Posts";
import { formatDate } from "../../utils/date";
import { RemixIcon } from "../RemixIcon";
import { Image } from "../Image";
import styles from "./styles.module.css";

export function PostList() {
  const { posts, activePost, setActivePost, toggleWatched } = usePosts();
  const [open, setOpen] = useState(false);

  const handlePostSelect = (post) => () => {
    setActivePost(post.id);
    setOpen(false);
  };

  const handleCheckboxToggle = (post) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWatched(post.id);
  };

  const togglePostList = () => {
    setOpen((previousState) => !previousState);
  };

  return (
    <>
      <div className={styles.postListToggle} onClick={togglePostList}>
        <RemixIcon icon={open ? "close" : "menu"} />
      </div>
      <div class={cn(styles.postList, { [styles.postListActive]: open })}>
        <ul>
          {posts.map((post) => (
            <li
              className={cn(styles.postListItem, {
                [styles.postListItemActive]: post.id === activePost?.id,
              })}
              onClick={handlePostSelect(post)}
              key={post.id}
            >
              {(post.thumbnail || post.image || post.metaImage) && (
                <Image
                  className={styles.postListItemThumbnail}
                  src={post.thumbnail?.square || post.image || post.metaImage}
                  alt={post.title}
                />
              )}
              <div className={styles.postListItemContent}>
                <div className={styles.postListItemTitle}>{post.title}</div>
                <p className={styles.postListItemDate}>
                  {formatDate(post.date)}
                </p>
              </div>
              <input
                id={post.id}
                type="checkbox"
                checked={post.watched}
                className={styles.postListItemCheckboxHidden}
              />
              <label
                htmlFor={post.id}
                onClick={handleCheckboxToggle(post)}
                className={cn(styles.postListItemCheckbox, {
                  [styles.postListItemCheckboxActive]: post.watched,
                })}
              >
                {post.watched && <RemixIcon icon="check" size={16} />}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
