import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HabitStore } from '../../shared/data-access/habit.store';
import { ThemeService } from '../../shared/theme.service';
import { HabitCalendarComponent } from './ui/habit-calendar.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div class="w-full flex flex-col items-center gap-3">
      <div
        class="w-full flex justify-between items-center 
        text-slate-900 dark:text-slate-200">
        <div class="flex">
          <button
            (click)="themeService.toggle()"
            class="p-2 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">
            <span class="material-symbols-outlined "> dark_mode </span>
          </button>
        </div>
        <h1 class="text-2xl tracking-tight font-semibold">My Habit Tracker</h1>
        <button
          class="p-2 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
          routerLink="new-habit">
          <span class="material-symbols-outlined"> add </span>
        </button>
      </div>
      <div class="w-full flex flex-col gap-3">
        @for (habit of habitStore.habits(); track $index) {
          <app-habit-calendar
            [habitId]="habit.id!"
            [startDate]="startDate()"
            [isExpanded]="habit.id === expandedHabitId"
            (delete)="onDelete(habit.id!)"
            (edit)="router.navigate([habit.id], { relativeTo: route })"
            (expand)="onExpand(habit.id!)" />
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

  year = signal(new Date().getFullYear());
  startDate = computed(() => new Date(this.year(), 0, 1));

  expandedHabitId: string | null = null;

  constructor() {
    effect(() => this.habitStore.initHabits(this.year()));
  }

  ngOnInit(): void {
    this.habitStore.initHabits(this.year);
  }

  onDelete(id: string) {
    this.habitStore.deleteHabit(id);
  }

  onExpand(id: string) {
    this.expandedHabitId = this.expandedHabitId === id ? null : id;
  }
}
