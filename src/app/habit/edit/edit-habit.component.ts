import { Component, OnInit, inject, input } from '@angular/core';
import { HabitStore } from '../../shared/data-access/habit.store';
import { HabitFormComponent } from '../ui/habit-form.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-edit-habit',
  template: ` <div class="w-full flex flex-col items-center gap-3 ">
    <div
      class="w-full flex justify-between items-center 
      text-slate-900 dark:text-slate-200 ">
      <button
        class="p-2 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
        routerLink="../">
        <span class="material-symbols-outlined"> arrow_back </span>
      </button>
      <h1 class="text-2xl tracking-tight font-semibold">Edit Habit</h1>
      <span class="size-6"></span>
    </div>
    <div
      class="w-full p-4 flex flex-col gap-3 border rounded-xl bg-red dark:bg-slate-700 shadow-sm">
      @if (!!habitStore.openedHabit()) {
        <app-habit-form
          [habit]="habitStore.openedHabit()!"
          (save)="habitStore.updateHabit($event)" />
      }
    </div>
  </div>`,
  imports: [HabitFormComponent, RouterLink],
})
export default class EditHabitComponent implements OnInit {
  habitStore = inject(HabitStore);

  id = input.required<string>();

  ngOnInit(): void {
    this.habitStore.openHabit(this.id());
  }
}
