import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { RestrictionScheduler } from "../../../models/restriction-scheduler";
import { Schedule } from "../../../models/schedule";

@Injectable({
  providedIn: "root",
})
export class RestrictionSchedulerService {
  private _schedules: Schedule[];
  private _active: boolean;
  private _schedulerObs: Subject<RestrictionScheduler>;

  constructor() {
    this._schedulerObs = new Subject();
  }

  public addNewSchedule(schedule: Schedule) {
    if (!(schedule.days && schedule.days.length)) {
      schedule.days = [0, 1, 2, 3, 4, 5, 6];
    }
    this._schedules.push(schedule);
    this._schedulerObs.next({
      active: this._active,
      schedules: this._schedules,
    });
    this.saveScheduler();
  }

  public getSchedules(): Observable<RestrictionScheduler> {
    chrome.storage.sync.get(
      { scheduler: { active: false, schedules: [] } },
      ({ scheduler }) => {
        this._schedules = scheduler?.schedules || [];
        this._active = scheduler?.active;
        this._schedulerObs.next({
          active: this._active,
          schedules: this._schedules,
        });
      }
    );
    return this._schedulerObs.asObservable();
  }

  public removeSchedule(index: number) {
    this._schedules.splice(index, 1);
    this._schedulerObs.next({
      active: this._active,
      schedules: this._schedules,
    });
    this.saveScheduler();
  }

  public changeActiveScheduler(activateRestrictionScheduler: boolean) {
    this._active = activateRestrictionScheduler;
    this._schedulerObs.next({
      active: this._active,
      schedules: this._schedules,
    });
    this.saveScheduler();
  }

  public saveScheduler() {
    chrome.storage.sync.set({
      scheduler: { active: this._active, schedules: this._schedules },
    });
  }
}
