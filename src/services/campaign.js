import { api } from "./api";
import config from "../config";
import storage from "../utils/localStorage";

export async function getCampaign() {
  const savedCampaigns = storage.get(storage.KEYS.CAMPAIGN) || {};
  const currentCampaign = savedCampaigns[config.campaignId];
  if (currentCampaign) {
    return currentCampaign;
  }

  const params = {
    include:
      "featured_post,featured_post.user,featured_post.attachments,featured_post.user_defined_tags,featured_post.campaign,featured_post.comments,featured_post.comments.commenter,featured_post.comments.commenter.campaign,featured_post.comments.on_behalf_of_campaign,featured_post.comments.parent,featured_post.comments.first_reply,featured_post.comments.first_reply.on_behalf_of_campaign,featured_post.poll.choices,featured_post.poll.current_user_responses.user,featured_post.poll.current_user_responses.choice,featured_post.poll.current_user_responses.poll,featured_post.access_rules.tier.null,featured_post.images.null,featured_post.audio.null",
    fields: {
      campaign: "avatar_photo_url,name,url,creation_name",
    },
    sort: "published_at",
    "json-api-version": 1.0,
  };

  const { data } = await api(`/campaigns/${config.campaignId}`, {
    params,
  });
  const payload = {
    url: data.attributes.url,
    name: data.attributes.name,
    description: data.attributes.creation_name,
    avatarUrl: data.attributes.avatar_photo_url,
  };

  storage.save(storage.KEYS.CAMPAIGN, {
    ...savedCampaigns,
    [config.campaignId]: payload,
  });

  return payload;
}

export async function getTags() {
  const params = {
    page: { count: "infinity" },
    "json-api-version": 1.0,
  };

  const { data } = await api(`/campaigns/${config.campaignId}/post-tags`, {
    params,
  });

  return data
    .filter(({ attributes }) => attributes.tag_type === "user_defined")
    .map(({ id, attributes }) => ({
      id,
      value: attributes.value,
    }));
}
