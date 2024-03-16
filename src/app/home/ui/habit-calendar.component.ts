import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  computed,
  input,
} from '@angular/core';
import { Habit } from '../../shared/model/habit';

@Component({
  standalone: true,
  selector: 'app-habit-calendar',
  template: `
    <div
      class="w-full p-4 flex flex-col gap-3 border rounded-xl bg-white shadow-sm"
    >
      <div class="flex justify-start items-center gap-3">
        <div
          class="size-12 flex justify-center items-center text-white bg-slate-900 rounded-lg"
        >
          <span class="material-symbols-outlined">{{ habit().icon }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-medium tracking-tight">{{ habit().name }}</span>
          <span class="text-sm">{{ habit().description }}</span>
        </div>
        <button
          (click)="toggle.emit()"
          class="ml-auto size-12 flex items-center justify-center gap-1 tracking-tight font-medium rounded-lg border transition duration-150"
          [ngClass]="todayChecked() ? 'bg-slate-900 text-white' : 'bg-white'"
        >
          @if (todayChecked()) {
          <span class="material-symbols-outlined text-lg font-semibold">
            done
          </span>
          }
        </button>
      </div>
      <div class="grid grid-rows-7 grid-flow-col gap-[1px]">
        @for(i of [].constructor(startDate().getDay()-1); track $index) {
        <div class="size-[12px] rounded"></div>
        } @for(day of daysToDisplay(); track $index) {
        <div class="size-[12px] rounded" [ngClass]="clazz(day)"></div>
        }
      </div>
    </div>
  `,
  imports: [CommonModule],
})
export class HabitCalendarComponent {
  habit = input.required<Habit>();
  daysToDisplay = input.required<Date[]>();
  startDate = input.required<Date>();

  @Output() toggle: EventEmitter<void> = new EventEmitter();

  firstDay = computed(() =>
    new Date(this.startDate().getFullYear(), 0, 1).getDay()
  );
  todayChecked = computed(() =>
    this.habit().days.some((d) => this.isToday(d.date))
  );
  days = computed(() => (this.habit().days ? this.habit().days : []));

  clazz(date: Date | null) {
    if (!date) {
      return '';
    }
    const completed = this.days().some((d) => {
      return d.date.getTime() === date.getTime() && d.completed;
    });

    return completed ? 'bg-slate-900' : 'bg-slate-200';
  }

  isToday(date: Date) {
    const today = new Date();
    return (
      date.getUTCFullYear() === today.getUTCFullYear() &&
      date.getUTCMonth() == today.getUTCMonth() &&
      date.getUTCDate() == today.getUTCDate()
    );
  }
}
