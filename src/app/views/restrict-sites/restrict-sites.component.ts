import { Component, OnInit } from "@angular/core";

@Component({
  selector: "restrict-sites",
  template: `<div class="animated fadeIn">
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
  constructor() {}

  ngOnInit(): void {}
}
