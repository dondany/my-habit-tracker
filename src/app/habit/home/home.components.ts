import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { HabitCalendarComponent } from './ui/habit-calendar.component';
import { HabitStore } from '../../shared/data-access/habit.store';
import { Habit } from '../../shared/model/habit';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../shared/theme.service';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div class="w-full flex flex-col items-center gap-3">
      <div
        class="w-full flex justify-between items-center text-slate-900 dark:text-slate-200"
      >
        <div class="flex">
          <button
            class="p-2 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <span class="material-symbols-outlined "> menu </span>
          </button>
          <button
            (click)="themeService.toggle()"
            class="p-2 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <span class="material-symbols-outlined "> dark_mode </span>
          </button>
        </div>
        <h1 class="text-2xl tracking-tight font-semibold">My Habit Tracker</h1>
        <button
          class="p-2 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
          routerLink="new-habit"
        >
          <span class="material-symbols-outlined"> add </span>
        </button>
      </div>
      <div class="w-full flex flex-col gap-3">
        @for (habit of habitStore.habits(); track $index) {
        <app-habit-calendar
          [habit]="habit"
          [daysToDisplay]="habitStore.daysToDisplay()"
          [startDate]="startDate"
          [isExpanded]="habit.id === expandedHabitId"
          (toggle)="onToggle(habit)"
          (dayToggle)="onDayToggle(habit, $event)"
          (delete)="onDelete(habit.id!)"
          (edit)="router.navigate([habit.id], { relativeTo: route })"
          (expand)="onExpand(habit.id!)"
        />
        }
      </div>
    </div>
  `,
  imports: [CommonModule, HabitCalendarComponent, RouterLink],
})
export default class HomeComponent implements OnInit {
  habitStore = inject(HabitStore);
  router = inject(Router);
  route = inject(ActivatedRoute);
  themeService = inject(ThemeService);
  startDate = new Date(2024, 0, 1);

  expandedHabitId: string | null = '1c13';

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

  onDayToggle(habit: Habit, date: Date) {
    let utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    const day = habit.days.find(
      (day) => day.date.getTime() === utcDate.getTime()
    );

    if (!!day) {
      this.habitStore.deleteDay(day.id!);
    } else {
      this.habitStore.addDay({ id: habit.id!, date: utcDate });
    }
  }

  onDelete(id: string) {
    this.habitStore.deleteHabit(id);
  }

  onExpand(id: string) {
    this.expandedHabitId = this.expandedHabitId === id ? null : id;
  }
}
