import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { SecurityService } from "./services/security.service";

import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "security",
  templateUrl: "./security.component.html",
  styleUrls: ["./security.component.scss"],
})
export class SecurityComponent implements OnInit {
  private _form: FormGroup;
  public get form(): FormGroup {
    return this._form;
  }

  private _cards: any[];
  public get card(): any[] {
    return this._cards;
  }

  constructor(
    private securityService: SecurityService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._form = new FormGroup({
      x: new FormControl("", [Validators.required]),
    });
  }

  submit() {}
}
