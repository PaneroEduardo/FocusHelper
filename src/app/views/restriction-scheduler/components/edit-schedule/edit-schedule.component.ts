import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { RestrictionSchedulerService } from '../../services/restriction-scheduler.service';

const clearFormArray = (formArray: FormArray) => {
  while (formArray.length !== 0) {
    formArray.removeAt(0)
  }
}

@Component({
  selector: "edit-schedule",
  templateUrl: "./edit-schedule.component.html",
  styleUrls: ["./edit-schedule.component.scss"],
})
export class EditScheduleComponent implements OnInit {
  constructor(private restrictionSchedulerService: RestrictionSchedulerService) {}

  @Output()
  public close = new EventEmitter<boolean>();

  private _hourPeriods: FormArray;
  public get hourPeriods(): FormArray {
    return this._hourPeriods;
  }

  private _form: FormGroup;
  public get form(): FormGroup {
    return this._form;
  }

  public get timelineLabels() {
    const periodsInADay = moment.duration(1, "day").as("m");

    const timeLabels = [];
    const startTimeMoment = moment("00:00", "HH:mm");
    for (let i = 0; i <= periodsInADay; i += 30) {
      startTimeMoment.add(i === 0 ? 0 : 30, "m");
      timeLabels.push(startTimeMoment.format("HH:mm"));
    }
    return timeLabels;
  }

  ngOnInit() {
    this._form = new FormGroup({
      hourPeriods: new FormArray([]),
      days: new FormArray([]),
    });

    this._hourPeriods = this._form.get("hourPeriods") as FormArray;
    this.addHourPeriods();
  }

  addHourPeriods() {
    this._hourPeriods.push(
      new FormGroup({
        startPeriod: new FormControl("00:00"),
        endPeriod: new FormControl("00:00"),
      })
    );
  }

  removeHourPeriod(i: number) {
    this._hourPeriods.removeAt(i)
  }

  onDaysSelected(daysSelected: boolean[]) {
    const indices = daysSelected.reduce(
      (out, bool, index) => (bool ? out.concat(index) : out),
      []
    );

    const formArray = this._form.get("days") as FormArray;
    clearFormArray(formArray);

    indices.forEach((i) => {
      formArray.push(new FormControl(i));
    });
  }

  saveScheduler() {
    this.restrictionSchedulerService.saveSchedule(this._form.value);
    this.close.emit(true);
  }

  closeModal() {
    this.close.emit(false);
  }
}
