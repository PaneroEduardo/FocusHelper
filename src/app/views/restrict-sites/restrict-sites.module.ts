import { RestrictSitesService } from './services/restrict-sites.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestrictSitesRoutingModule } from './restrict-sites-routing.module';
import { RestrictSitesComponent } from './restrict-sites.component';
import { RestrictSocialMediaComponent } from './components/restrict-social-media/restrict-social-media.component';
import { RestrictStreamingServicesComponent } from './components/restrict-streaming-services/restrict-streaming-services.component';
import { RestrictCustomUrlsComponent } from './components/restrict-custom-urls/restrict-custom-urls.component';


@NgModule({
  declarations: [RestrictSitesComponent, RestrictSocialMediaComponent, RestrictStreamingServicesComponent, RestrictCustomUrlsComponent],
  providers: [RestrictSitesService],
  imports: [
    CommonModule,
    RestrictSitesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RestrictSitesModule { }
