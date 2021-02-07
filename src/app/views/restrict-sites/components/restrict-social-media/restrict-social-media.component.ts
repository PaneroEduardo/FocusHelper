import { RestrictSitesService } from "./../../services/restrict-sites.service";
import { SocialMedia } from "./../../../../models/social-media";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "restrict-social-media",
  templateUrl: "./restrict-social-media.component.html",
  styleUrls: ["./restrict-social-media.component.scss"],
})
export class RestrictSocialMediaComponent implements OnInit {
  private _form: FormGroup;
  public get restrictSocialMediaForm(): FormGroup {
    return this._form;
  }

  constructor(private restrictSitesService: RestrictSitesService) {
    this._form = new FormGroup({
      restrictSocialMedia: new FormControl(false, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this._form.valueChanges.subscribe((x)=>this.saveSocialMediaChanges(x));

    this.restrictSitesService
      .getSocialMediaSettings()
      .subscribe((socialMedia: SocialMedia) => {
        this._form.get("restrictSocialMedia").setValue(socialMedia && socialMedia.restricted)
      });
  }

  saveSocialMediaChanges({restrictSocialMedia}) {
    this.restrictSitesService.saveSocialMediaSettings({
      restricted: restrictSocialMedia,
    } as SocialMedia);
  }
}
