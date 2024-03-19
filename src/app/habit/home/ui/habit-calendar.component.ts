import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  computed,
  input,
} from '@angular/core';
import { Habit } from '../../../shared/model/habit';

@Component({
  standalone: true,
  selector: 'app-habit-calendar',
  template: `
    <div
      class="w-full p-4 flex flex-col gap-3 border rounded-xl bg-white shadow-sm"
      (click)="isOpened = !isOpened"
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
          (click)="toggle.emit()"
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
      @if(isOpened) {
      <div class="w-full flex gap-2 border-t py-2 justify-end">
        <button
          (click)="edit.emit()"
          class="px-2 py-1 bg-slate-100 hover:bg-slate-200 font-thin flex items-center justify-center rounded-lg"
        >
          <span class="material-symbols-outlined text-lg"> edit </span>
        </button>
        <button
          (click)="delete.emit()"
          class="px-2 py-1 bg-slate-100 hover:bg-slate-200 font-thin flex items-center justify-center rounded-lg"
        >
          <span class="material-symbols-outlined text-lg"> delete </span>
        </button>
      </div>
      }
    </div>
  `,
  imports: [CommonModule],
})
export class HabitCalendarComponent {
  habit = input.required<Habit>();
  daysToDisplay = input.required<Date[]>();
  startDate = input.required<Date>();

  @Output() toggle: EventEmitter<void> = new EventEmitter();
  @Output() delete: EventEmitter<void> = new EventEmitter();
  @Output() edit: EventEmitter<void> = new EventEmitter();

  firstDay = computed(() =>
    new Date(this.startDate().getFullYear(), 0, 1).getDay()
  );
  todayChecked = computed(() =>
    this.habit().days.some((d) => this.isToday(d.date))
  );
  days = computed(() => (this.habit().days ? this.habit().days : []));

  isOpened = true;

  clazz(date: Date | null) {
    if (!date) {
      return '';
    }
    const completed = this.days().some((d) => {
      return d.date.getTime() === date.getTime() && d.completed;
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
