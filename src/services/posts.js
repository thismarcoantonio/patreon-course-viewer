import qs from "qs";
import { api } from "./api";

export const POST_TYPES = {
  TEXT_ONLY: "text_only",
  VIDEO_EXTERNAL_FILE: "video_external_file",
  VIDEO_EMBED: "video_embed",
};

export async function getPosts() {
  const params = {
    include:
      "campaign,access_rules,attachments,audio,audio_preview.null,images,media,native_video_insights,poll.choices,poll.current_user_responses.user,poll.current_user_responses.choice,poll.current_user_responses.poll,user,user_defined_tags,ti_checks",
    fields: {
      campaign:
        "currency,show_audio_post_download_links,avatar_photo_url,avatar_photo_image_urls,earnings_visibility,is_nsfw,is_monthly,name,url",
      post: "change_visibility_at,comment_count,commenter_count,content,current_user_can_comment,current_user_can_delete,current_user_can_view,current_user_has_liked,current_user_can_report,embed,image,impression_count,insights_last_updated_at,is_paid,like_count,meta_image_url,min_cents_pledged_to_view,post_file,post_metadata,published_at,patreon_url,post_type,pledge_url,preview_asset_type,thumbnail,thumbnail_url,teaser_text,title,upgrade_url,url,was_posted_by_campaign_owner,has_ti_violation,moderation_status,post_level_suspension_removal_date,pls_one_liners_by_category,video_preview,view_count",
      post_tag: "tag_type,value",
      user: "image_url,full_name,url",
      access_rule: "access_rule_type,amount_cents",
      media: "id,image_urls,download_url,metadata,file_name",
      native_video_insights:
        "average_view_duration,average_view_pct,has_preview,id,last_updated_at,num_views,preview_views,video_duration",
    },
    filter: {
      campaign_id: window.patreon.bootstrap.campaign.data.id,
      contains_exclusive_posts: true,
      is_draft: false,
      tag: qs.parse(window.location.search.slice(1)).filters.tag,
    },
    sort: "published_at",
    "json-api-version": 1.0,
  };

  const { data, meta } = await api("https://www.patreon.com/api/posts", {
    params,
  });

  return {
    pagination: meta.pagination,
    posts: data.map(({ attributes, id, type }) => ({
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
    })),
  };
}