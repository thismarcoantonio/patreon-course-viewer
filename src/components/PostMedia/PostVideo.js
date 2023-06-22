import { h } from "preact";
import { useLayoutEffect } from "preact/hooks";
import videojs from "video.js";
import styles from "./styles.module.css";

export function PostVideo({ video }) {
  useLayoutEffect(() => {
    const player = videojs("patreonCourseViewerVideoPlayer");
    player.addClass(styles.postMediaVideo);
    return () => {
      player.dispose();
    };
  }, []);

  return (
    <video
      controls
      width="100%"
      data-setup="{}"
      class="video-js"
      id="patreonCourseViewerVideoPlayer"
    >
      <source src={video} type="application/x-mpegURL" />
    </video>
  );
}
