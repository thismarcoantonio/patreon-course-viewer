import { h } from "preact";
import { PostMedia, supportedMediaTypes } from "../PostMedia";
import { CampaignDetails } from "../CampaignDetails";
import { PostDetails } from "../PostDetails";
import styles from "./styles.module.css";

export function MainContent({ activePost, campaign }) {
  return (
    <div className={styles.mainContent}>
      {supportedMediaTypes.includes(activePost.postType) && (
        <PostMedia post={activePost} />
      )}
      <CampaignDetails campaign={campaign} />
      <PostDetails post={activePost} />
    </div>
  );
}
