import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { HabitCalendarComponent } from './ui/habit-calendar.component';
import { HabitStore } from './data-access/habit.store';
import { Habit } from '../shared/model/habit';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div class="flex flex-col items-center mt-4 gap-4 font-display">
      <h1 class="text-2xl tracking-tight font-semibold">My Habit Tracker</h1>
      <div class="flex flex-col gap-3">
        @for (habit of habitStore.habits(); track $index) {
        <app-habit-calendar
          [habit]="habit"
          [daysToDisplay]="habitStore.daysToDisplay()"
          [startDate]="startDate"
          (toggle)="onToggle(habit)"
        />
        }
      </div>
    </div>
  `,
  imports: [CommonModule, HabitCalendarComponent],
})
export default class HomeComponent implements OnInit {
  habitStore = inject(HabitStore);
  startDate = new Date(2024, 0, 1);

  ngOnInit(): void {
    this.habitStore.init(2024);
    this.habitStore.initHabits(2024);
  }

  onToggle(habit: Habit) {
    let today = new Date();
    today = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );
    const day = habit.days.find(
      (day) => day.date.getTime() === today.getTime()
    );
    if (!!day) {
      this.habitStore.deleteDay(day.id!);
    } else {
      this.habitStore.addDay({ id: habit.id!, date: today });
    }
  }
}
