import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OptionsService {
  private _disabledOptions: Subject<boolean>;

  constructor() {
    this._disabledOptions = new Subject<boolean>();
  }

  public getDisabledOptions() {
    chrome.storage.sync.get(
      { options: { disabledOptions: true }, scheduler: { active: false, schedules: [] } },
      ({ options, scheduler }) => {
        if (scheduler.active && options.disabledOptions) {
          const now = new Date();
          const momentNow = moment(
            `${now.getHours()}:${now.getMinutes()}`,
            "HH:mm"
          );
          this._disabledOptions.next(scheduler.schedules.some(
            (x) =>
              x.days.indexOf(now.getDay() === 0 ? 7 : now.getDay() - 1) > -1 &&
              x.hourPeriods.some(
                (y) =>
                  moment(y.startPeriod, "HH:mm").isBefore(momentNow) &&
                  moment(y.endPeriod, "HH:mm").isAfter(momentNow)
              )
          ));
        }else{
          this._disabledOptions.next(false);
        }
      }
    );
    return this._disabledOptions.asObservable();
  }
}
