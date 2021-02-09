import { CustomUrls } from './../../../models/custom-urls';
import { StreamingServices } from './../../../models/streaming-services';
import { SocialMedia } from "./../../../models/social-media";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RestrictSitesService {
  private _urls: string[];
  private _customUrlsRestricted: boolean;

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

  public createNewUrl(url: string) {
    this._urls.push(
      new URL(url).host.replace(/www\./g, "")
    );
    this._customUrlsObs.next({restricted: this._customUrlsRestricted, urls: this._urls} as CustomUrls)
    this.saveCustomUrlsSettings();
  }

  public deleteUrl(i: number) {
    this._urls.splice(i, 1);
    this._customUrlsObs.next({restricted: this._customUrlsRestricted, urls: this._urls} as CustomUrls)
    this.saveCustomUrlsSettings();
  }

  public changeActiveRestrictionCustomUrls(activeRestrictedCustomUrls: boolean) {
    this._customUrlsRestricted = activeRestrictedCustomUrls;
    this._customUrlsObs.next({restricted: this._customUrlsRestricted, urls: this._urls} as CustomUrls)
    this.saveCustomUrlsSettings();
  }


  private saveCustomUrlsSettings() {
    chrome.storage.sync.set({ customUrls: {restricted: this._customUrlsRestricted, urls: this._urls} });
  }

  public getCustomUrlsSettings() {
    chrome.storage.sync.get(
      { customUrls: { restricted: false, urls: [] } },
      ({ customUrls }) => {
        this._customUrlsRestricted = customUrls.restricted
        this._urls = customUrls.urls;
        this._customUrlsObs.next({restricted: this._customUrlsRestricted, urls: this._urls} as CustomUrls);
      }
    );

    return this._customUrlsObs.asObservable();
  }
}
