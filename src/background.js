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

const arrayMove = (arr, oldIndex, newIndex) => {
  if (newIndex >= arr.length) {
      var k = newIndex - arr.length + 1;
      while (k--) {
          arr.push(undefined);
      }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
};

const redirect = (tabId) => {
  chrome.tabs.update(tabId, {
    url: chrome.runtime.getURL("index.html#/forbidden"),
  });
};

const saveUrl = (url) => {
  chrome.storage.local.get(
    { last5UrlsRestricted: [] },
    ({ last5UrlsRestricted }) => {
      let indexUrl = last5UrlsRestricted.indexOf(url);
      if (indexUrl > -1) {
        last5UrlsRestricted = arrayMove(last5UrlsRestricted, indexUrl, 0);
      } else {
        if (last5UrlsRestricted.length > 4) {
          last5UrlsRestricted.pop();
        }
        last5UrlsRestricted.unshift(url);
      }
      chrome.storage.local.set({ last5UrlsRestricted });
    }
  );
};

const getHourStringAsNumber = (hourStr) => {
  const [ hour, minute ] = hourStr.split(":").map((x) => parseInt(x));
  return hour * 60 + minute;
};

const getHourAsNumber = (date) => {
  return date.getHours() * 60 + date.getMinutes();
};

const checkScheduler = (scheduler) => {
  if (scheduler.active) {
    const today = new Date();
    const schedule = scheduler.schedules.filter(
      (x) => x.days.indexOf(today.getDay() === 0 ? 7 : today.getDay() - 1) > -1
    );
    if (schedule) {
      return schedule.some(x => x.hourPeriods.some(
        (y) =>
          getHourStringAsNumber(y.startPeriod) < getHourAsNumber(today) &&
          getHourAsNumber(today) < getHourStringAsNumber(y.endPeriod)
      ));
    }
    return false;
  }
};

const checkGroup = (url, scheduler, tabId, urls) => {
  let regex = new RegExp(`https?:\/\/(www\.){0,1}(${urls.join("|")})`, "gi");
  if (regex.test(url) && checkScheduler(scheduler)) {
    saveUrl(url);
    redirect(tabId);
    return true;
  }
  return false;
};

const checkSocialMedia = (url, tabId) => {
  chrome.storage.sync.get(
    {
      socialMedia: { restricted: false },
      scheduler: { active: false, schedules: [] },
    },
    ({ socialMedia, scheduler }) => {
      if (socialMedia.restricted) {
        checkGroup(url, scheduler, tabId, socialMediaUrls) ||
          checkStreamingService(url, tabId);
      }
    }
  );
};

const checkStreamingService = (url, tabId) => {
  chrome.storage.sync.get(
    {
      streamingServices: { restricted: false },
      scheduler: { active: false, schedules: [] },
    },
    ({ streamingServices, scheduler }) => {
      if (streamingServices.restricted) {
        checkGroup(url, scheduler, tabId, streamingServiceUrls) ||
          checkCustomUrls(url, tabId);
      }
    }
  );
};

const checkCustomUrls = (url, tabId) => {
  chrome.storage.sync.get(
    {
      customUrls: { restricted: false, urls: [] },
      scheduler: { active: false, schedules: [] },
    },
    ({ customUrls, scheduler }) => {
      if (customUrls.restricted) {
        checkGroup(url,scheduler, tabId, customUrls.urls);
      }
    }
  );
};

// To improve the performance, first the background.js check if the urls is from a social media then checks if is a streaming service and then check the custom urls of the user

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = new URL(tab.url).origin;
  checkSocialMedia(url, tabId);
});
