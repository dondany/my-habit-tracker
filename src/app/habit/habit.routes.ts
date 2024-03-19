import { Route } from '@angular/router';

export const HABIT_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./home/home.components'),
  },
  {
    path: 'new-habit',
    loadComponent: () => import('./new/new-habit.component'),
  },
  {
    path: ':id',
    loadComponent: () => import('./edit/edit-habit.component'),
  },
];
