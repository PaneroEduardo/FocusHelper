import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RestrictionSchedulerService {

  private _schedulesObs: Subject<any>;

  constructor() {
    this._schedulesObs = new Subject()
  }


  public saveSchedule(schedule: any) {
    chrome.storage.sync.get("schedules", ({ schedules }) => {
      if(!schedules){
        schedules = [];
      }
      schedules.push(schedule)
      chrome.storage.sync.set({ schedules });

    });
  }

  public getSchedules() {
    chrome.storage.sync.get("", ({ schedules }) => {
      if(!schedules){
        schedules = [];
      }
      this._schedulesObs.next(schedules || []);
    });

    return this._schedulesObs.asObservable();
  }
}
