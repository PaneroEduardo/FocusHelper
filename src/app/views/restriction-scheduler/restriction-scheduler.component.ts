import { DaysOfWeek } from "./../../models/days-of-week.enum";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RestrictionSchedulerService } from "./services/restriction-scheduler.service";
import { Schedule } from "../../models/schedule";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { OptionsService } from "../../global/services/options.service";

@Component({
  selector: "app-restriction-scheduler",
  templateUrl: "./restriction-scheduler.component.html",
  styleUrls: ["./restriction-scheduler.component.scss"],
})
export class RestrictionSchedulerComponent implements OnInit {
  @ViewChild("createScheduleModal")
  public createScheduleModal: ModalDirective;

  private _form: FormGroup;
  public get activateRestrictionSchedulerForm(): FormGroup {
    return this._form;
  }

  private _showAlert = false;
  public get showAlert(): boolean {
    return this._showAlert;
  }

  private _schedules$: Observable<Schedule[]>;
  public get schedules$(): Observable<Schedule[]> {
    return this._schedules$;
  }

  private _disabledOptions: boolean;
  public get disableOptions(): boolean {
    return this._disabledOptions;
  }

  constructor(
    private restrictionSchedulerService: RestrictionSchedulerService,
    private optionsService: OptionsService,
    private cd: ChangeDetectorRef
  ) {
    this._form = new FormGroup({
      activateRestrictionScheduler: new FormControl(false, [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    this._schedules$ = this.restrictionSchedulerService
      .getSchedules()
      .pipe(map((x) => x.schedules));

    this.optionsService.getDisabledOptions().subscribe((disable) => {
      this._disabledOptions = disable;
      this.cd.detectChanges();
    });

    this.restrictionSchedulerService
      .getSchedules()
      .pipe(map((x) => x.active))
      .subscribe((x) => {
        this._form
          .get("activateRestrictionScheduler")
          .setValue(x, { emitEvent: false });
        this.cd.detectChanges();
      });

    this._form.valueChanges.subscribe(({ activateRestrictionScheduler }) =>
      this.restrictionSchedulerService.changeActiveScheduler(
        activateRestrictionScheduler
      )
    );
  }

  getSchedules() {
    this.cd.detectChanges();
  }

  deleteSchedule(i) {
    this.restrictionSchedulerService.removeSchedule(i);
  }

  openCreateScheduleModal() {
    this.createScheduleModal.show();
  }

  closeCreateScheduleModal(saved) {
    this.createScheduleModal.hide();
    if (saved) {
      this._showAlert = saved;
    }
  }

  onClosedAlert(): void {
    this._showAlert = false;
  }
}
