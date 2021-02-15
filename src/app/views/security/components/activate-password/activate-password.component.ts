import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SecurityService } from "../../services/security.service";
@Component({
  selector: "activate-password",
  templateUrl: "./activate-password.component.html",
  styleUrls: ["./activate-password.component.scss"],
})
export class ActivatePasswordComponent implements OnInit {

  private _activePasswordForm: boolean;
  public get activePasswordForm(): boolean {
    return this._activePasswordForm;
  }

  private _activatePasswordForm: FormGroup;
  public get activatePasswordForm(): FormGroup {
    return this._activatePasswordForm;
  }

  private _passwordForm: FormGroup;
  public get passwordForm(): FormGroup {
    return this._passwordForm;
  }

  constructor(
    private securityService: SecurityService,
    private cd: ChangeDetectorRef
  ) {
    this._activatePasswordForm = new FormGroup({
      activatePassword: new FormControl(false, [Validators.required]),
    });

    this._passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required])
    });
    
  }

  ngOnInit() {
    this.securityService
      .getPasswordActive().subscribe((passwordActive: boolean) => {
        this._activePasswordForm = passwordActive;
        this._activatePasswordForm
          .get("activatePassword")
          .setValue(passwordActive, { emitEvent: false });
        this.cd.detectChanges();
      });

    this._activatePasswordForm.valueChanges.subscribe(({ activatePassword }) =>
      this.securityService.changePasswordActive(activatePassword)
    );
  }

  savePassword(){
    this.securityService.savePassword(this.passwordForm.value.password);
  }
}
