import { CustomUrls } from "../../../../models/custom-urls";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RestrictSitesService } from "../../services/restrict-sites.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "restrict-custom-urls",
  templateUrl: "./restrict-custom-urls.component.html",
  styleUrls: ["./restrict-custom-urls.component.scss"],
})
export class RestrictCustomUrlsComponent implements OnInit {
  private _restrictForm: FormGroup;
  public get restrictCustomUrlsForm(): FormGroup {
    return this._restrictForm;
  }

  private _newUrlForm: FormGroup;
  public get newUrlForm(): FormGroup {
    return this._newUrlForm;
  }

  private _urls$: Observable<string[]>;
  public get urls$(): Observable<string[]> {
    return this._urls$;
  }

  constructor(
    private cd: ChangeDetectorRef,
    private restrictSitesService: RestrictSitesService
  ) {
    this._restrictForm = new FormGroup({
      resctrictCustomUrls: new FormControl(false, [Validators.required]),
    });
    this._newUrlForm = new FormGroup({
      url: new FormControl("", [
        Validators.required,
        Validators.pattern(
          /^(http[s]?:\/\/){1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
        ),
      ]),
    });

    this._urls$ = this.restrictSitesService
      .getCustomUrlsSettings()
      .pipe(map((x) => x.urls));

    this.restrictSitesService
      .getCustomUrlsSettings()
      .pipe(map((x) => x.restricted))
      .subscribe((x) => {
        this._restrictForm
          .get("resctrictCustomUrls")
          .setValue(x, { emitEvent: false });
        this.cd.detectChanges();
      });
  }

  ngOnInit(): void {
    this._restrictForm.valueChanges.subscribe(({ resctrictCustomUrls }) =>
      this.restrictSitesService.changeActiveRestrictionCustomUrls(
        resctrictCustomUrls
      )
    );
  }

  createNewUrl() {
    if (this._newUrlForm.valid) {
      this.restrictSitesService.createNewUrl(this._newUrlForm.value.url);
      this._newUrlForm.reset();
    }
  }

  deleteUrl(i: number) {
    this.restrictSitesService.deleteUrl(this._newUrlForm.value.url);
  }
}
