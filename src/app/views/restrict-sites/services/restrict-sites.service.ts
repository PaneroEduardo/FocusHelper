import { CustomUrls } from './../../../models/custom-urls';
import { StreamingServices } from './../../../models/streaming-services';
import { SocialMedia } from "./../../../models/social-media";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RestrictSitesService {

  private _socialMediaObs: Subject<SocialMedia>;
  private _streamingServicesObs: Subject<StreamingServices>;
  private _customUrlsObs: Subject<CustomUrls>;

  constructor() {
    this._socialMediaObs = new Subject<SocialMedia>();
    this._streamingServicesObs = new Subject<StreamingServices>();
    this._customUrlsObs = new Subject<CustomUrls>();
  }

  public saveSocialMediaSettings(socialMedia: SocialMedia) {
    chrome.storage.sync.set({ socialMedia });
  }

  public getSocialMediaSettings() {
    chrome.storage.sync.get("socialMedia", ({ socialMedia }) => {
      this._socialMediaObs.next(socialMedia as SocialMedia);
    });

    return this._socialMediaObs.asObservable();
  }

  public saveStreamingServicesSettings(streamingServices: StreamingServices) {
    chrome.storage.sync.set({ streamingServices });
  }

  public getStreamingServicesSettings() {
    chrome.storage.sync.get("streamingServices", ({ streamingServices }) => {
      this._streamingServicesObs.next(streamingServices as StreamingServices);
    });

    return this._streamingServicesObs.asObservable();
  }

  public saveCustomUrlsSettings(customUrls: CustomUrls) {
    chrome.storage.sync.set({ customUrls });
  }

  public getCustomUrlsSettings() {
    chrome.storage.sync.get(
      { customUrls: { restricted: false, urls: [] } },
      ({ customUrls }) => {
        this._customUrlsObs.next(customUrls as CustomUrls);
      }
    );

    return this._customUrlsObs.asObservable();
  }


}
