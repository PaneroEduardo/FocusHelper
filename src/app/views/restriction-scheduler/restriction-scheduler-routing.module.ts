import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RestrictionSchedulerComponent } from "./restriction-scheduler.component";

const routes: Routes = [
  {
    path: "",
    component: RestrictionSchedulerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestrictionSchedulerRoutingModule {}
