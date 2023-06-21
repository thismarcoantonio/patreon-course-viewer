import "./styles.css";

console.log("Hello", document);

// let loadInterval;
// let i = 0;
// const content = document.getElementById("renderPageContentWrapper");
// const target = document.getElementById("reactTarget");

// const loadingWrapper = document.createElement("div");
// loadingWrapper.classList.add("patreon-course-viewer__loading-wrapper");
// loadingWrapper.innerHTML = `
//   Loading
// `;
// document.body.appendChild(loadingWrapper);

// function getNewPosts() {
//   const loading = document.querySelector("[aria-label='loading more posts']");
//   if (loading) return;

//   const buttons = Array.from(content.querySelectorAll("button"));
//   const button = buttons.find((button) => button.textContent === "Load more");

//   if (!loading && !button) {
//     clearInterval(loadInterval);
//     document.body.removeChild(loadingWrapper);
//     renderPostList();
//     renderPostVideo();
//     return;
//   }

//   // Load new posts
//   console.log("Load more posts", i++);
//   button.click();
// }

// function getPost(post) {
//   const postTitle = post.querySelector("[data-tag=post-title]");
//   const postDate = post.querySelector("[data-tag=post-published-at]");
//   const postContent = post.querySelector("[data-tag=post-content-collapse]");
//   const video = post.querySelector("[data-tag=media-container]");
//   return {
//     title: postTitle.textContent,
//     date: postDate.textContent,
//     meta: {
//       postTitle,
//       postDate,
//       postContent,
//       video,
//     },
//   };
// }

// function renderPostList() {
//   const posts = Array.from(
//     content.querySelectorAll("[data-tag=post-card]")
//   ).reverse();
//   const listWrapper = document.createElement("ul");
//   listWrapper.classList.add("patreon-course-viewer__post-list");
//   listWrapper.innerHTML = posts
//     .map((item) => {
//       const post = getPost(item);
//       return `<li>${post.title}${post.date} <input type="checkbox" /></li>`;
//     })
//     .join("");
//   target.appendChild(listWrapper);
// }

// function renderPostVideo() {
//   const posts = Array.from(
//     content.querySelectorAll("[data-tag=post-card]")
//   ).reverse();
//   const listWrapper = document.createElement("ul");
//   listWrapper.classList.add("patreon-course-viewer__post-list");
// }

// loadInterval = setInterval(getNewPosts, 1000);
