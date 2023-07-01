let isOpen = false;
let isCurrentUrlValid = false;

function isValidUrl(url) {
  return (
    url.startsWith("https://www.patreon.com") ||
    url.startsWith("https://patreon.com")
  );
}

chrome.action.onClicked.addListener(async (tab) => {
  if (isValidUrl(tab.url)) {
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

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);
  if (isCurrentUrlValid === isValidUrl(tab.url)) return;

  isCurrentUrlValid = !isCurrentUrlValid;

  chrome.action.setIcon({
    path: {
      16: `public/16${!isCurrentUrlValid ? "-grey" : ""}.png`,
      32: `public/32${!isCurrentUrlValid ? "-grey" : ""}.png`,
      48: `public/48${!isCurrentUrlValid ? "-grey" : ""}.png`,
      128: `public/128${!isCurrentUrlValid ? "-grey" : ""}.png`,
    },
  });
});
