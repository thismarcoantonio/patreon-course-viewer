import { h } from "preact";
import { usePosts } from "../../hooks/Posts";
import { PostMedia, supportedMediaTypes } from "../PostMedia";
import { CampaignDetails } from "../CampaignDetails";
import { PostDetails } from "../PostDetails";
import styles from "./styles.module.css";

export function MainContent() {
  const { activePost } = usePosts();

  return (
    <div className={styles.mainContent}>
      {supportedMediaTypes.includes(activePost.postType) && <PostMedia />}
      <CampaignDetails />
      <PostDetails />
    </div>
  );
}
