import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SecurityService } from "../../services/security.service";
@Component({
  selector: "activate-password",
  templateUrl: "./activate-password.component.html",
  styleUrls: ["./activate-password.component.scss"],
})
export class ActivatePasswordComponent implements OnInit {
  private _activatePasswordForm: FormGroup;
  public get activatePasswordForm(): FormGroup {
    return this._activatePasswordForm;
  }

  constructor(
    private securityService: SecurityService,
    private cd: ChangeDetectorRef
  ) {
    this._activatePasswordForm = new FormGroup({
      activatePassword: new FormControl(false, [Validators.required]),
    });
  }

  ngOnInit() {
    this.securityService
      .getPasswordActive()
      .subscribe((passwordActive: boolean) => {
        this._activatePasswordForm
          .get("activatePassword")
          .setValue(passwordActive, { emitEvent: false });
      });

    this._activatePasswordForm.valueChanges.subscribe(({ activatePassword }) =>
      this.securityService.changePasswordActive(activatePassword)
    );
  }
}
