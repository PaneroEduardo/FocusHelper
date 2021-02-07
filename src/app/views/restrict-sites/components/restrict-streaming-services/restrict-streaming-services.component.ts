import { StreamingServices } from './../../../../models/streaming-services';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestrictSitesService } from '../../services/restrict-sites.service';

@Component({
  selector: 'restrict-streaming-services',
  templateUrl: './restrict-streaming-services.component.html',
  styleUrls: ['./restrict-streaming-services.component.scss']
})
export class RestrictStreamingServicesComponent implements OnInit {
  private _form: FormGroup;
  public get restrictStreamingServicesForm(): FormGroup {
    return this._form;
  }

  constructor(private restrictSitesService: RestrictSitesService) {
    this._form = new FormGroup({
      restrictStreamingServices: new FormControl(false, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this._form.valueChanges.subscribe((x)=>this.saveStreamingServicesChanges(x));

    this.restrictSitesService
      .getStreamingServicesSettings()
      .subscribe((streamingServices: StreamingServices) => {
        this._form.get("restrictStreamingServices").setValue(streamingServices && streamingServices.restricted)
      });
  }

  saveStreamingServicesChanges({restrictStreamingServices}) {
    this.restrictSitesService.saveStreamingServicesSettings({
      restricted: restrictStreamingServices,
    } as StreamingServices);
  }
}
