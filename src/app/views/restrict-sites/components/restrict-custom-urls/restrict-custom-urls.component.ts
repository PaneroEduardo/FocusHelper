import { CustomUrls } from "../../../../models/custom-urls";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RestrictSitesService } from "../../services/restrict-sites.service";

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

  private _urls: Array<string>;
  public get urls(): Array<string> {
    return this._urls;
  }

  constructor(private ref: ChangeDetectorRef, private restrictSitesService: RestrictSitesService) {
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
  }

  createNewUrl() {
    if (this._newUrlForm.valid) {
      this._urls.push(new URL(this._newUrlForm.value.url).host.replace(/www\./g, ""));
      this.saveUrls();
      this._newUrlForm.reset();
    }
  }

  deleteUrl(i: number) {
    this._urls.splice(i, 1);
    this.saveUrls();
  }

  saveUrls() {
    this.saveCustomUrlsChanges({
      restricted: this._restrictForm.value.resctrictCustomUrls,
      urls: this.urls,
    });
  }

  ngOnInit(): void {
    this._restrictForm.valueChanges.subscribe(({ resctrictCustomUrls }) =>
      this.saveCustomUrlsChanges({
        restricted: resctrictCustomUrls,
        urls: this.urls,
      })
    );

    this.restrictSitesService
      .getCustomUrlsSettings()
      .subscribe((customUrls: CustomUrls) => {
        this._urls = customUrls.urls || [];
        this._restrictForm
          .get("resctrictCustomUrls")
          .setValue(customUrls && customUrls.restricted);
        this.ref.detectChanges();
      });
  }

  saveCustomUrlsChanges(customUrls: CustomUrls) {
    this.restrictSitesService.saveCustomUrlsSettings(customUrls);
  }
}
