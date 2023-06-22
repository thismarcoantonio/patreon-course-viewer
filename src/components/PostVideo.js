import { h } from "preact";
import { useLayoutEffect } from "preact/hooks";
import videojs from "video.js";

export function PostVideo({ video }) {
  useLayoutEffect(() => {
    const player = videojs("patreonCourseViewerVideoPlayer");
    return player.dispose;
  }, [video]);

  return (
    <video
      controls
      data-setup="{}"
      class="video-js"
      id="patreonCourseViewerVideoPlayer"
    >
      <source src={video} type="application/x-mpegURL" />
    </video>
  );
}
