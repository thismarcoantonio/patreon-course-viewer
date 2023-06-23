import { h } from "preact";
import { Image } from "../Image";

export function CampaignDetails({ campaign }) {
  return (
    <a href={campaign.url} target="_blank">
      <Image src={campaign.avatarUrl} name={campaign.name} />
      {campaign.name}
    </a>
  );
}
