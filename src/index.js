import { h, Component, render } from "preact";
import { PostsProvider } from "./hooks/Posts";
import { CampaignProvider } from "./hooks/Campaign";
import { TagsProvider } from "./hooks/Tags";
import App from "./App";
import "video.js/dist/video-js.min.css";
import "./styles.css";

const target = document.getElementById("reactTarget");
const root = document.createElement("div");
root.setAttribute("id", "patreonCourseViewer");
target.appendChild(root);

render(
  <PostsProvider>
    <CampaignProvider>
      <TagsProvider>
        <App />
      </TagsProvider>
    </CampaignProvider>
  </PostsProvider>,
  root
);
