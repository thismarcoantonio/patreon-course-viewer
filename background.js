let activeTab;
let isUrlValid = false;

const tabState = {
  get isOpen() {
    const state = this[activeTab] || {};
    return state.isOpen;
  },
  set isOpen(value) {
    if (!this[activeTab]) {
      this[activeTab] = {};
    }
    this[activeTab].isOpen = value;
  },
};

function isValidUrl(url) {
  const urlRegex = /https:\/\/(w{3})?\.?patreon\.com\/.*\/posts/gi;
  return urlRegex.test(url);
}

function resetState(tabId) {
  activeTab = tabId;
  if (tabState[tabId]) {
    delete tabState[tabId];
  }
}

chrome.action.onClicked.addListener(async (tab) => {
  activeTab = tab.id;

  if (isValidUrl(tab.url) && !tabState.isOpen) {
    tabState.isOpen = true;
    await chrome.scripting.executeScript({
      world: "MAIN",
      target: { tabId: tab.id, allFrames: true },
      files: ["content.js"],
    });
  }
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);
  const isValid = isValidUrl(tab.url);

  chrome.action.setIcon({
    path: {
      16: `public/16${!isValid ? "-grey" : ""}.png`,
      32: `public/32${!isValid ? "-grey" : ""}.png`,
      48: `public/48${!isValid ? "-grey" : ""}.png`,
      128: `public/128${!isValid ? "-grey" : ""}.png`,
    },
  });
});

chrome.tabs.onRemoved.addListener(resetState);
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.title === "Patreon") {
    resetState(tabId);
  }
});
