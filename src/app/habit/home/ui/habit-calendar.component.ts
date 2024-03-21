import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  computed,
  effect,
  input,
} from '@angular/core';
import { Habit } from '../../../shared/model/habit';
import { CalendarComponent } from './calendar.component';

@Component({
  standalone: true,
  selector: 'app-habit-calendar',
  template: `
    <div
      class="w-full p-4 flex flex-col gap-3 border rounded-xl bg-white shadow-sm cursor-pointer"
      (click)="expand.emit()"
    >
      <div class="flex justify-start items-center gap-3">
        <div
          class="size-12 flex justify-center items-center rounded-lg"
          [ngClass]="colorClass()"
        >
          <span class="material-symbols-outlined">{{ habit().icon }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-medium tracking-tight">{{ habit().name }}</span>
          <span class="text-sm">{{ habit().description }}</span>
        </div>
        <button
          (click)="toggle.emit(); $event.stopPropagation()"
          class="ml-auto size-12 flex items-center justify-center gap-1 tracking-tight font-medium rounded-lg border transition duration-150"
          [ngClass]="todayChecked() ? colorClass() : 'bg-white'"
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

      <div
        class="w-full transition-all duration-200 overflow-hidden select-none"
        [ngClass]="isExpanded() ? 'h-80' : 'h-0'"
      >
        @if(isExpanded()) {
        <div class="flex gap-2 py-4 justify-end ">
          <app-calendar
            [habitDays]="habit().days"
            class="mr-auto"
            (toggle)="dayToggle.emit($event)"
          />
          <button
            (click)="edit.emit(); $event.stopPropagation()"
            class="size-fit px-2 py-1 bg-slate-100 hover:bg-slate-200 font-thin flex items-center justify-center rounded-lg"
          >
            <span class="material-symbols-outlined text-lg"> edit </span>
          </button>
          <button
            (click)="delete.emit(); $event.stopPropagation()"
            class="size-fit px-2 py-1 bg-slate-100 hover:bg-slate-200 font-thin flex items-center justify-center rounded-lg"
          >
            <span class="material-symbols-outlined text-lg"> delete </span>
          </button>
        </div>

        }
      </div>
    </div>
  `,
  imports: [CommonModule, CalendarComponent],
})
export class HabitCalendarComponent {
  habit = input.required<Habit>();
  daysToDisplay = input.required<Date[]>();
  startDate = input.required<Date>();
  isExpanded = input<boolean>(false);

  constructor() {
    effect(() => {
      console.log(this.daysToDisplay());
    });
  }

  @Output() toggle: EventEmitter<void> = new EventEmitter();
  @Output() dayToggle = new EventEmitter<Date>();
  @Output() delete: EventEmitter<void> = new EventEmitter();
  @Output() edit: EventEmitter<void> = new EventEmitter();
  @Output() expand: EventEmitter<void> = new EventEmitter();

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
      return (
        d.date.getFullYear() === date.getFullYear() &&
        d.date.getMonth() === date.getMonth() &&
        d.date.getDate() === date.getDate() &&
        d.completed
      );
    });

    return completed ? this.colorClass() : 'bg-slate-200';
  }

  isToday(date: Date) {
    const today = new Date();
    return (
      date.getUTCFullYear() === today.getUTCFullYear() &&
      date.getUTCMonth() == today.getUTCMonth() &&
      date.getUTCDate() == today.getUTCDate()
    );
  }

  colorClass() {
    return {
      'bg-red-400': this.habit().color === 'red',
      'bg-blue-400': this.habit().color === 'blue',
      'bg-green-400': this.habit().color === 'green',
      'bg-pink-400': this.habit().color === 'pink',
      'bg-yellow-400': this.habit().color === 'yellow',
      'bg-indigo-400': this.habit().color === 'indigo',
      'bg-slate-900': this.habit().color === 'slate' || !this.habit().color,
      'bg-orange-400': this.habit().color === 'orange',
      'bg-lime-400': this.habit().color === 'lime',
      'bg-purple-400': this.habit().color === 'purple',
      'bg-zinc-400': this.habit().color === 'zinc',
      'bg-teal-400': this.habit().color === 'teal',
      'text-white': true,
    };
  }
}
