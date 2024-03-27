import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'habit',
    loadChildren: () =>
      import('./habit/habit.routes').then(m => m.HABIT_ROUTES),
  },
  {
    path: '',
    redirectTo: 'habit',
    pathMatch: 'full',
  },
];
