import qs from "qs";
import { api } from "./api";
import config from "../config";

export const POST_TYPES = {
  TEXT_ONLY: "text_only",
  VIDEO_EXTERNAL_FILE: "video_external_file",
  VIDEO_EMBED: "video_embed",
};

export async function getPosts() {
  const params = {
    include: "campaign,user_defined_tags",
    fields: {
      post: "change_visibility_at,comment_count,commenter_count,content,current_user_can_comment,current_user_can_delete,current_user_can_view,current_user_has_liked,current_user_can_report,embed,image,impression_count,insights_last_updated_at,is_paid,like_count,meta_image_url,min_cents_pledged_to_view,post_file,post_metadata,published_at,patreon_url,post_type,pledge_url,preview_asset_type,thumbnail,thumbnail_url,teaser_text,title,upgrade_url,url,was_posted_by_campaign_owner,has_ti_violation,moderation_status,post_level_suspension_removal_date,pls_one_liners_by_category,video_preview,view_count",
    },
    filter: {
      campaign_id: config.campaignId,
      contains_exclusive_posts: true,
      is_draft: false,
    },
    page: {
      count: "infinity",
    },
    sort: "published_at",
    "json-api-version": 1.0,
  };

  const { data } = await api("/posts", {
    params,
  });

  return data.map(({ attributes, id, type, relationships }) => ({
    id,
    type,
    postType: attributes.post_type,
    url: attributes.url,
    title: attributes.title,
    text: attributes.teaser_text,
    content: attributes.content,
    thumbnail: attributes.thumbnail,
    embed: attributes.embed?.html,
    image: attributes.image?.url,
    metaImage: attributes.meta_image_url,
    file: attributes.post_file,
    date: attributes.published_at,
    tags: (relationships.user_defined_tags?.data || [])
      .filter((tag) => tag.id.startsWith("user_defined;"))
      .map((tag) => tag.id.slice(13)),
  }));
}
