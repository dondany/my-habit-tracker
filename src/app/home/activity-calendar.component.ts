import { Component, computed, input } from '@angular/core';
import { Day } from './day';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-activity-calendar',
  template: `
    <div class="grid grid-rows-7 grid-flow-col gap-[1px]">
      <!-- @for(i of [].constructor(371); track $index) {
      <div class="size-[10px] rounded" [ngClass]="clazz(date($index))"></div>
      } -->
      @for(i of [].constructor(startDate().getDay()-1); track $index) {
      <div class="size-[10px] rounded"></div>
      } @for(day of days(); track $index) {
      <div class="size-[10px] rounded" [ngClass]="clazz2(day)"></div>
      }
    </div>
  `,
  imports: [CommonModule],
})
export class ActivityCalendarComponent {
  days = input.required<Day[]>();
  startDate = input.required<Date>();
  firstDay = computed(() =>
    new Date(this.startDate().getFullYear(), 0, 1).getDay()
  );
  daysInYear = computed(() =>
    new Date(this.startDate().getFullYear(), 1, 29).getMonth() == 1 ? 366 : 365
  );

  date(index: number): Date | null {
    if (index < this.firstDay()) {
      return null;
    }
    const offset = index - this.firstDay();
    if (offset >= this.daysInYear()) {
      return null;
    }
    const date = new Date(this.startDate());
    date.setDate(date.getDate() + offset);
    return date;
  }

  clazz(date: Date | null) {
    if (!date) {
      return '';
    }
    const completed = this.days().some((d) => {
      return d.date.getTime() === date.getTime() && d.completed;
    });

    return completed ? 'bg-yellow-400' : 'bg-slate-200';
  }

  clazz2(day: Day) {
    return day.completed ? 'bg-yellow-400' : 'bg-slate-200';
  }
}
