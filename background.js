let isOpen = false;

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.includes("patreon.com")) {
    if (!isOpen) {
      isOpen = true;
      await chrome.scripting.executeScript({
        world: "MAIN",
        target: { tabId: tab.id, allFrames: true },
        files: ["content.js"],
      });
    }
    if (isOpen) {
      await chrome.scripting.executeScript({
        world: "MAIN",
        target: { tabId: tab.id, allFrames: true },
        files: ["reset.js"],
      });
    }
  }
});
