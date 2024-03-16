import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'new-habit',
    loadComponent: () => import('./new-habit/new-habit.component'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
