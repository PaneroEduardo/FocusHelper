import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SecurityComponent } from "./security.component";
import { SecurityService } from "./services/security.service";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SecurityRoutingModule } from "./security-routing.module";
import { ActivatePasswordComponent } from "./components/activate-password/activate-password.component";

@NgModule({
  declarations: [SecurityComponent, ActivatePasswordComponent],
  providers: [SecurityService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SecurityRoutingModule,
  ],
})
export class SecurityModule {}
