import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { Schedule } from "../../../models/schedule";

@Injectable({
  providedIn: "root",
})
export class RestrictionSchedulerService {
  private _schedules: Schedule[];
  private _schedulesObs: Subject<Schedule[]>;

  constructor() {
    this._schedulesObs = new Subject();
  }

  public addNewSchedule(schedule: Schedule) {
    if (!(schedule.days && schedule.days.length)) {
      schedule.days = [0, 1, 2, 3, 4, 5, 6];
    }
    this._schedules.push(schedule);
    this._schedulesObs.next(this._schedules);
    chrome.storage.sync.set({ schedules: this._schedules });
  }

  public getSchedules(): Observable<Schedule[]> {
    chrome.storage.sync.get("schedules", ({ schedules }) => {
      this._schedules = schedules || [];
      this._schedulesObs.next(this._schedules);
    });
    return this._schedulesObs.asObservable();
  }

  public removeSchedule(index: number) {
    this._schedules.splice(index, 1);
    this._schedulesObs.next(this._schedules);
    chrome.storage.sync.set({ schedules: this._schedules });
  }
}
