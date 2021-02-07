import { DaysOfWeek } from './../../models/days-of-week.enum';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap/modal";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestrictionSchedulerService } from './services/restriction-scheduler.service';

@Component({
  selector: "app-restriction-scheduler",
  templateUrl: "./restriction-scheduler.component.html",
  styleUrls: ["./restriction-scheduler.component.scss"],
})
export class RestrictionSchedulerComponent implements OnInit {

  constructor(private restrictionSchedulerService: RestrictionSchedulerService) {
    this._form = new FormGroup({
      activateRestrictionScheduler: new FormControl(false, [Validators.required]),
    });
  }

  @ViewChild('createScheduleModal') 
  public createScheduleModal: ModalDirective;

  private _form: FormGroup;
  public get activateRestrictionSchedulerForm(): FormGroup {
    return this._form;
  }

  private _showAlert = false
  public get showAlert(): boolean {
    return this._showAlert;
  }

  ngOnInit(): void {}

  openCreateScheduleModal() {
    this.createScheduleModal.show();
  }
  
  closeCreateScheduleModal(saved){
    this.createScheduleModal.hide();
    this._showAlert = saved;
  }

  onClosedAlert(): void {
    this._showAlert = false;
  }
}
