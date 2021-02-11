import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForbiddenRoutingModule } from './forbidden-routing.module';
import { ForbiddenComponent } from './forbidden.component';
import { ForbiddenService } from './services/forbidden.service';


@NgModule({
    declarations: [ForbiddenComponent],
    providers: [ForbiddenService],
    imports: [
        CommonModule,
        ForbiddenRoutingModule
    ]
  })
  export class ForbiddenModule {}