import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PasswordSettings } from "../../../models/password-settings";

@Injectable()
export class SecurityService {
  private _passwordActiveObs: Subject<boolean>;
  private _passwordActive: boolean;
  private _password: string;

  constructor() {
    this._passwordActiveObs = new Subject<boolean>();
  }

  public changePasswordActive(passwordActive: boolean) {
    this._passwordActive = passwordActive;
    this.savePasswordSettings();
    this._passwordActiveObs.next(this._passwordActive);
  }

  public savePassword(password: string) {
    this._password = password;
    this.savePasswordSettings();
  }

  public getPasswordActive(): Observable<boolean> {
    chrome.storage.sync.get(
      { passwordSettings: { active: false, password: "" } },
      ({ passwordSettings }) => {
        this._passwordActive = passwordSettings.active;
        this._password = passwordSettings.password;
        this._passwordActiveObs.next(this._passwordActive);
      }
    );

    return this._passwordActiveObs.asObservable();
  }

  private savePasswordSettings() {
    const passwordSettings = {
      active: this._passwordActive,
      password: this._password,
    } as PasswordSettings;
    chrome.storage.sync.set({ passwordSettings });
  }
}
