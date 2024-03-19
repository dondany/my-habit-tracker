import { Component, OnInit, inject, input } from '@angular/core';
import { HabitStore } from '../../shared/data-access/habit.store';
import { HabitFormComponent } from '../ui/habit-form.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-edit-habit',
  template: ` <div class="w-full flex flex-col items-center gap-3 ">
    <div class="w-full flex justify-between items-center">
      <button
        class="p-2 flex items-center justify-center rounded-lg hover:bg-slate-200"
        routerLink="../"
      >
        <span class="material-symbols-outlined text-slate-900">
          arrow_back
        </span>
      </button>
      <h1 class="text-2xl tracking-tight font-semibold">Edit Habit</h1>
      <span class="size-6"></span>
    </div>
    <div
      class="w-full p-4 flex flex-col gap-3 border rounded-xl bg-white shadow-sm"
    >
      @if(!!habitStore.openedHabit()) {

      <app-habit-form [habit]="habitStore.openedHabit()!" />
      }
    </div>
  </div>`,
  imports: [HabitFormComponent, RouterLink],
})
export default class EditHabitComponent implements OnInit {
  habitStore = inject(HabitStore);

  id = input.required<string>();

  ngOnInit(): void {
    console.log('init');
    this.habitStore.openHabit(this.id());
  }
}
