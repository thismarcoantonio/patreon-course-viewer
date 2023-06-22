chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.includes("patreon.com")) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === "ON" ? "OFF" : "ON";

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      await chrome.scripting.executeScript({
        world: "MAIN",
        target: { tabId: tab.id, allFrames: true },
        files: ["content.js"],
      });
    }
    if (nextState === "OFF") {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        files: ["reset.js"],
      });
    }
  }
});
