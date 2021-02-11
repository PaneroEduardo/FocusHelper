const socialMediaUrls = [
  "facebook.com",
  "instagram.com",
  "twitter.com",
  "tiktok.com",
  "reddit.com",
  "youtube.com",
  "youtube.es",
];

const streamingServiceUrls = [
  "netflix.com",
  "hboespana.com",
  "hbo.co.uk",
  "hbo.com",
  "primevideo.com",
  "disneyplus.com",
];

const redirect = (tabId) => {
  chrome.tabs.update(tabId, {
    url: chrome.runtime.getURL("index.html#/forbidden"),
  });
};

const checkGroup = (url, tabId, urls) => {
  let regex = new RegExp(`https?:\/\/(www\.){0,1}(${urls.join("|")})`, "gi");
  if (regex.test(url)) {
    redirect(tabId);
    return true;
  }
  return false;
};

const checkSocialMedia = (url, tabId) => {
  chrome.storage.sync.get("socialMedia", ({ socialMedia }) => {
    if (socialMedia.restricted) {
      checkGroup(url, tabId, socialMediaUrls) ||
        checkStreamingService(url, tabId);
    }
  });
};

const checkStreamingService = (url, tabId) => {
  chrome.storage.sync.get("streamingServices", ({ streamingServices }) => {
    if (streamingServices.restricted) {
      checkGroup(url, tabId, streamingServiceUrls) ||
        checkCustomUrls(url, tabId);
    }
  });
};

const checkCustomUrls = (url, tabId) => {
  chrome.storage.sync.get(
    { customUrls: { restricted: false, urls: [] } },
    ({ customUrls }) => {
      if (customUrls.restricted) {
        checkGroup(url, tabId, customUrls.urls);
      }
    }
  );
};

// To improve the performance, first the background.js check if the urls is from a social media then checks if is a streaming service and then check the custom urls of the user

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = new URL(tab.url).origin;
  checkSocialMedia(url, tabId);
});
