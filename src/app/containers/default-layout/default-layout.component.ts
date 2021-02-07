import {Component} from '@angular/core';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems =   [{
    name: 'Restricción de Sitios',
    url: '/options/restriction/sites',
    icon: 'icon-shield',
  },
  {
    name: 'Programar Restricciones',
    url: '/options/restriction/scheduler',
    icon: 'icon-calendar',
  }];

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}