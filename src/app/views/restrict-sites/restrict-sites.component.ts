import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { OptionsService } from "../../global/services/options.service";

@Component({
  selector: "restrict-sites",
  template: `<div class="animated fadeIn" [ngClass]="{'disabled': disableOptions }">
    <div class="card border-0">
      <div class="card-body">
        <restrict-social-media></restrict-social-media>
        <hr />
        <restrict-streaming-services></restrict-streaming-services>
        <hr />
        <restrict-custom-urls></restrict-custom-urls>
      </div>
    </div>
  </div>`,
})
export class RestrictSitesComponent implements OnInit {

  private _disabledOptions: boolean
  public get disableOptions(): boolean {
    return this._disabledOptions;
  }

  constructor(private optionsService: OptionsService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.optionsService.getDisabledOptions().subscribe((disable)=> {
      this._disabledOptions = disable;
      this.cd.detectChanges();
    });
  }
}
