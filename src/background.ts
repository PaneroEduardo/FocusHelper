let globalOptions = {

};

const checkGroup = (url, group) => {
  if (globalOptions[group].urls && globalOptions[group].urls.length) {
    let regex = new RegExp(`https?:\/\/(www\.){0,1}(${globalOptions[group].urls.join("|")})`, "gi");
    return globalOptions[group].block && regex.test(url);
  }
  return false;
};

const checkUrl = (url) => {
  return Object.keys(globalOptions).some((group) => checkGroup(url, group));
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.storage.sync.get({ options: globalOptions }, ({ options }) => {
    globalOptions = options;
    if (checkUrl(new URL(tab.url).origin)) {
      chrome.tabs.update(tab.id, {
        url: chrome.runtime.getURL("views/nope.html"),
      });
    }
  });
});
