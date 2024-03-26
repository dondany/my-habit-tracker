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
    class="flex flex-col items-center cursor-auto text-sm"
    (click)="$event.stopPropagation()"
  >
    <div
      class="w-72 px-2 flex justify-between text-slate-700 dark:text-slate-200"
    >
      <button (click)="month = month - 1; generateCalendar()">
        <span class="material-symbols-outlined">chevron_left</span>
      </button>
      <span class="font-semibold">{{ months[month] }}</span>
      <button (click)="month = month + 1; generateCalendar()">
        <span class="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
    <div class="aspect-square size-72 grid grid-rows-7 grid-cols-7">
      @for(name of daysOfWeekShort; track $index) {
      <div
        class="flex items-center justify-center font-bold text-slate-700 dark:text-slate-200"
      >
        {{ name }}
      </div>
      } @for (day of days; track $index) {
      <div
        class="flex justify-center items-center text-sm cursor-pointer text-slate-700 dark:text-slate-200 relative"
        (click)="toggle.emit(day)"
      >
        <div
          class="absolute h-7 z-10 left-0 w-[50%] transition-opacity duration-150"
          [ngClass]="chainClass(day, 'left')"
        ></div>
        <div
          class="absolute h-7 z-10 right-0 w-[50%] transition-opacity duration-150"
          [ngClass]="chainClass(day, 'right')"
        ></div>

        <div
          class="size-7 z-20 rounded-full flex justify-center items-center text-xs font-semibold transition-colors duration-150"
          [ngClass]="dayClass(day)"
        >
          <span [ngClass]="{ 'opacity-80': day.getMonth() !== month }">{{
            day.getDate()
          }}</span>
        </div>
      </div>
      }
    </div>
  </div>`,
  imports: [CommonModule],
})
export class CalendarComponent {
  habitDays = input.required<Day[]>();
  color = input.required<string>();
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

  dayClass(day: Date) {
    return {
      'bg-red-400': this.color() === 'red' && this.isDayMarked(day),
      'bg-blue-400': this.color() === 'blue' && this.isDayMarked(day),
      'bg-green-400': this.color() === 'green' && this.isDayMarked(day),
      'bg-pink-400': this.color() === 'pink' && this.isDayMarked(day),
      'bg-yellow-400': this.color() === 'yellow' && this.isDayMarked(day),
      'bg-indigo-400': this.color() === 'indigo' && this.isDayMarked(day),
      'bg-slate-900': this.color() === 'slate' && this.isDayMarked(day),
      'bg-orange-400': this.color() === 'orange' && this.isDayMarked(day),
      'bg-lime-400': this.color() === 'lime' && this.isDayMarked(day),
      'bg-purple-400': this.color() === 'purple' && this.isDayMarked(day),
      'bg-zinc-400': this.color() === 'zinc' && this.isDayMarked(day),
      'bg-teal-400': this.color() === 'teal' && this.isDayMarked(day),
      'text-white': this.isDayMarked(day),
    };
  }

  chainClass(day: Date, side: 'left' | 'right') {
    const previousDay = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate() - 1
    );
    const nextDay = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate() + 1
    );
    return {
      'bg-red-300': this.color() === 'red',
      'bg-blue-300': this.color() === 'blue',
      'bg-green-300': this.color() === 'green',
      'bg-pink-300': this.color() === 'pink',
      'bg-yellow-300': this.color() === 'yellow',
      'bg-indigo-300': this.color() === 'indigo',
      'bg-orange-300': this.color() === 'orange',
      'bg-lime-300': this.color() === 'lime',
      'bg-purple-300': this.color() === 'purple',
      'bg-zinc-300': this.color() === 'zinc',
      'bg-teal-300': this.color() === 'teal',
      'opacity-30':
        (this.isLeftChain(day, previousDay) && side === 'left') ||
        (this.isRightChain(day, nextDay) && side === 'right'),
      'opacity-0':
        !(this.isLeftChain(day, previousDay) && side === 'left') &&
        !(this.isRightChain(day, nextDay) && side === 'right'),
    };
  }

  isLeftChain(day: Date, previousDay: Date) {
    return (
      this.isDayMarked(day) &&
      this.isDayMarked(previousDay) &&
      day.getDay() != 1
    );
  }

  isRightChain(day: Date, nextDay: Date) {
    return (
      this.isDayMarked(day) && this.isDayMarked(nextDay) && day.getDay() != 0
    );
  }
}
