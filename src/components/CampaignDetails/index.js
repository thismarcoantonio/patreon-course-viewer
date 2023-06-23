import { h } from "preact";
import { Image } from "../Image";
import styles from "./styles.module.css";

export function CampaignDetails({ campaign }) {
  return (
    <a className={styles.campaignDetails} href={campaign.url} target="_blank">
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
  );
}
