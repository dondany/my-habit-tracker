import { Component, inject } from '@angular/core';
import { ColorRadioComponent } from '../ui/color-radio.component';
import { IconRadioComponent } from '../ui/icon-radio.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HabitStore } from '../../shared/data-access/habit.store';
import { HabitFormComponent } from '../ui/habit-form.component';

@Component({
  standalone: true,
  selector: 'app-new-habit',
  template: ` <div
    class="w-full flex flex-col items-center gap-3
    text-slate-900 dark:text-slate-200">
    <div class="w-full flex justify-between items-center">
      <button
        class="p-2 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
        routerLink="..">
        <span class="material-symbols-outlined "> arrow_back </span>
      </button>
      <h1 class="text-2xl tracking-tight font-semibold">New Habit</h1>
      <span class="size-6"></span>
    </div>
    <div
      class="w-full p-4 flex flex-col gap-3 border rounded-xl bg-white dark:bg-slate-700 dark:border-transparent shadow-sm">
      <app-habit-form (save)="habitStore.addHabit($event)" />
    </div>
  </div>`,
  imports: [
    IconRadioComponent,
    ColorRadioComponent,
    ReactiveFormsModule,
    RouterLink,
    HabitFormComponent,
  ],
})
export default class NewHabitComponent {
  habitStore = inject(HabitStore);
}
