import { RestrictionSchedulerModule } from './views/restriction-scheduler/restriction-scheduler.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent, EmptyLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'options',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'options',
    component: DefaultLayoutComponent,
    data: {
      title: 'Options'
    },
    children: [
      {
        path: 'restriction/sites',
        loadChildren: () => import('./views/restrict-sites/restrict-sites.module').then(m => m.RestrictSitesModule)
      },
      {
        path: 'restriction/scheduler',
        loadChildren: () => import('./views/restriction-scheduler/restriction-scheduler.module').then(m => m.RestrictionSchedulerModule)
      },
      {
        path: '',
        redirectTo: 'restriction/sites',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'forbidden',
    component: EmptyLayoutComponent,
    data: {
      title: 'Este sitio esta restringido'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./views/forbidden/forbidden.module').then(m => m.ForbiddenModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
