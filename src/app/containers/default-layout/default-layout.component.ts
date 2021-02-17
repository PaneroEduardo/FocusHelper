import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems =   [{
    name: 'Restricción de Sitios',
    url: '/options/restriction/sites'
  },
  {
    name: 'Programar Restricciones',
    url: '/options/restriction/scheduler'
  },  
  {
    name: 'Seguridad',
    url: '/options/security'
  }];

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
