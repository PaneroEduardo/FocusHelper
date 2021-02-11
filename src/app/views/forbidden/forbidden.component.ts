import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ForbiddenService } from "./services/forbidden.service";

@Component({
  selector: "forbidden",
  templateUrl: "./forbidden.component.html",
  styleUrls: ["./forbidden.component.scss"],
})
export class ForbiddenComponent implements OnInit {
 
  constructor(
    private forbiddenService: ForbiddenService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}
}
