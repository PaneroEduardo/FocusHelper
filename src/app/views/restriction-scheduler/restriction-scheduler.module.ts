import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestrictionSchedulerRoutingModule } from './restriction-scheduler-routing.module';
import { RestrictionSchedulerComponent } from './restriction-scheduler.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

import { DaysSelectorComponent } from './components/days-selector/days-selector.component';
import { EditScheduleComponent } from './components/edit-schedule/edit-schedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DaysPipe } from './pipes/days.pipe';


@NgModule({
  declarations: [RestrictionSchedulerComponent, DaysSelectorComponent, EditScheduleComponent, DaysPipe],
  imports: [
    CommonModule,
    RestrictionSchedulerRoutingModule,
    ModalModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RestrictionSchedulerModule { }
