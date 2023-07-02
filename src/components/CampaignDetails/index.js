import { h } from "preact";
import { useCampaign } from "../../hooks/Campaign";
import { useTags } from "../../hooks/Tags";
import { Image } from "../Image";
import { TagSelector } from "../TagSelector";
import styles from "./styles.module.css";

export function CampaignDetails() {
  const { campaign } = useCampaign();
  const { tags } = useTags();

  return (
    <div className={styles.campaignDetails}>
      <a
        className={styles.campaignDetailsAuthor}
        href={campaign.url}
        target="_blank"
      >
        <Image
          className={styles.campaignDetailsImage}
          src={campaign.avatarUrl}
          name={campaign.name}
        />
        <div className={styles.campaignDetailsInfo}>
          <b>{campaign.name}</b>
          <p className={styles.campaignDetailsDescription}>
            {campaign.description}
          </p>
        </div>
      </a>
      {tags.length && <TagSelector />}
    </div>
  );
}
