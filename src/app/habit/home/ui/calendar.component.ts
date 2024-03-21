import { Component, EventEmitter, Output, input } from '@angular/core';
import { Day } from '../../../shared/model/day';
import { CommonModule } from '@angular/common';

export interface Week {
  days: Date[];
}

@Component({
  standalone: true,
  selector: 'app-calendar',
  template: ` <div
    class="flex flex-col cursor-auto text-sm"
    (click)="$event.stopPropagation()"
  >
    <div class="w-full px-2 flex justify-between">
      <button (click)="month = month - 1; generateCalendar()">
        <span class="material-symbols-outlined">chevron_left</span>
      </button>
      <span class="font-semibold text-slate-700">{{ months[month] }}</span>
      <button (click)="month = month + 1; generateCalendar()">
        <span class="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
    <div class="grid grid-rows-7 grid-cols-7">
      @for(name of daysOfWeekShort; track $index) {
      <div
        class="size-10 flex items-center justify-center font-bold text-slate-700"
      >
        {{ name }}
      </div>
      } @for (day of days; track $index) {
      <div
        class="size-10 flex justify-center items-centers text-sm text-slate-700 cursor-pointer"
        (click)="toggle.emit(day)"
      >
        <div
          class="size-7 rounded-full flex justify-center items-center text-xs"
          [ngClass]="{
            'bg-blue-400': isDayMarked(day),
            'text-slate-400': day.getMonth() !== month
          }"
        >
          <span
            class="font-semibold"
            [ngClass]="{
              'text-white': isDayMarked(day)
            }"
            >{{ day.getDate() }}</span
          >
        </div>
      </div>
      }
    </div>
  </div>`,
  imports: [CommonModule],
})
export class CalendarComponent {
  habitDays = input.required<Day[]>();
  @Output() toggle = new EventEmitter<Date>();

  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  daysOfWeekShort = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  days: Date[] = [];
  year: number = 2024;
  month: number = 2;

  constructor() {
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDay = new Date(this.year, this.month, 1);
    const lastDay = new Date(this.year, this.month + 1, 0);
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    const daysInMonth = lastDay.getDate();

    let days: Date[] = [];

    for (let i = firstDayIndex - 1; i > 0; i--) {
      days.push(new Date(this.year, this.month, firstDay.getDate() - i));
    }

    for (let i = 0; i < daysInMonth; i++) {
      days.push(new Date(this.year, this.month, firstDay.getDate() + i));
    }

    const numberOfNextMonthDays = 42 - days.length + 1;
    for (let i = 1; i < numberOfNextMonthDays; i++) {
      days.push(new Date(this.year, this.month, lastDay.getDate() + i));
    }

    this.days = days;
  }

  isDayMarked(date: Date) {
    return this.habitDays().some(
      (d) =>
        d.date.getFullYear() === date.getFullYear() &&
        d.date.getMonth() === date.getMonth() &&
        d.date.getDate() === date.getDate()
    );
  }
}
