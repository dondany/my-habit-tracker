import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  computed,
  input,
} from '@angular/core';
import { Habit } from '../../../shared/model/habit';
import { CalendarComponent } from './calendar.component';
import { DayComponent } from './day.component';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

@Component({
  standalone: true,
  selector: 'app-habit-calendar',
  template: `
    <div
      class="p-4 flex flex-col gap-4 border rounded-xl cursor-pointer
      bg-white dark:bg-slate-700 dark:border-none shadow-sm"
      aria-hidden="true"
      (click)="onExpand()">
      <div class="flex justify-start items-start gap-3">
        <div
          class="size-12 flex justify-center items-center rounded-lg"
          [ngClass]="colorClass()">
          <span class="material-symbols-outlined">{{ habit().icon }}</span>
        </div>
        <div class="flex flex-col dark:text-slate-200">
          <span class="font-medium tracking-tight">{{ habit().name }}</span>
          <span class="text-sm">{{ habit().description }}</span>
        </div>
        <button
          (click)="toggle.emit(); $event.stopPropagation()"
          class="ml-auto size-12 flex items-center justify-center gap-1 tracking-tight border font-medium rounded-lg transition duration-150"
          [ngClass]="
            todayChecked()
              ? colorClass()
              : 'bg-white dark:bg-transparent dark:border-slate-200/20'
          ">
          @if (todayChecked()) {
            <span class="material-symbols-outlined text-lg font-semibold">
              done
            </span>
          }
        </button>
      </div>
      <div
        #scroll
        class="grid grid-rows-7 grid-flow-col gap-[1px] overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        @for (i of [].constructor(startDate().getDay() - 1); track $index) {
          <div class="size-[12px] rounded"></div>
        }
        @for (day of daysToDisplay(); track $index) {
          <app-day
            [color]="habit().color!"
            [day]="day"
            [isCompleted]="isCompleted(day)"
            [id]="'day' + $index"
            #day />
        }
      </div>

      <div
        class="w-full transition-all duration-500 ease-in-out overflow-hidden select-none"
        [ngClass]="isExpanded() ? 'h-96' : 'h-0'">
        <div class="w-full mt-2 flex flex-col items-center justify-center">
          <app-calendar
            [habitDays]="habit().days"
            [color]="habit().color!"
            class=""
            (toggle)="dayToggle.emit($event)" />
          <div class="ml-auto flex justify-end gap-2">
            <button
              (click)="edit.emit(); $event.stopPropagation()"
              class="size-fit px-2 py-1 flex items-center gap-1 rounded-lg tracking-tight 
                bg-slate-200 hover:bg-slate-300 text-slate-700
                dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-slate-300
                transition-colors duration-200">
              <span class="material-symbols-outlined text-lg"> edit </span>
              <span class="font-medium">Edit</span>
            </button>
            <button
              (click)="
                showDeleteConfirmation = !showDeleteConfirmation;
                $event.stopPropagation()
              "
              class="relative size-fit px-2 py-1 flex items-center gap-1 rounded-lg tracking-tight
                bg-slate-200 hover:bg-slate-300 text-slate-700
                dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-slate-300
                transition-colors duration-200">
              <span class="material-symbols-outlined text-lg"> delete </span>
              <span class="font-medium">Delete</span>

              @if (showDeleteConfirmation) {
                <div
                  (appClickOutside)="showDeleteConfirmation = false"
                  class="absolute px-4 pt-4 pb-2 left-0 top-0 z-50 translate-y-[-110%] translate-x-[-50%] rounded-lg flex flex-col gap-2 items-center border shadow-lg
                  bg-white
                  dark:bg-slate-800 dark:text-slate-200 dark:border-transparent
                  ">
                  <span class="w-fit">Are You sure?</span>
                  <div class="p-2 flex justify-between gap-2">
                    <button
                      (click)="delete.emit(); $event.stopPropagation()"
                      class="py-1 w-10 bg-red-500 rounded hover:bg-red-400 text-white font-medium transform-colors duration-200">
                      Yes
                    </button>
                    <button
                      (click)="
                        showDeleteConfirmation = !showDeleteConfirmation;
                        $event.stopPropagation()
                      "
                      class="py-1 w-10  rounded font-medium 
                      hover:bg-slate-200
                      dark:bg-slate-800 dark:hover:bg-slate-700 border dark:border-slate-500/50
                      transform-colors duration-200">
                      No
                    </button>
                  </div>
                  <div
                    class="absolute left-[80%] bottom-0 translate-y-[100%] size-0 border-8 border-l-transparent border-r-transparent border-b-transparent border-white
                    dark:border-t-slate-800"></div>
                </div>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [
    CommonModule,
    CalendarComponent,
    DayComponent,
    ClickOutsideDirective,
  ],
})
export class HabitCalendarComponent implements AfterViewInit {
  habit = input.required<Habit>();
  daysToDisplay = input.required<Date[]>();
  startDate = input.required<Date>();
  isExpanded = input<boolean>(false);

  @Output() toggle: EventEmitter<void> = new EventEmitter();
  @Output() dayToggle = new EventEmitter<Date>();
  @Output() delete: EventEmitter<void> = new EventEmitter();
  @Output() edit: EventEmitter<void> = new EventEmitter();
  @Output() expand: EventEmitter<void> = new EventEmitter();

  @ViewChild('scroll') scroll!: ElementRef<HTMLElement>;
  @ViewChildren('day') allDays!: QueryList<DayComponent>;

  firstDay = computed(() =>
    new Date(this.startDate().getFullYear(), 0, 1).getDay()
  );
  todayChecked = computed(() =>
    this.habit().days.some(d => this.isToday(d.date))
  );
  days = computed(() => (this.habit().days ? this.habit().days : []));

  showDeleteConfirmation = false;

  constructor(public elRef: ElementRef) {}

  ngAfterViewInit(): void {
    const today = new Date();
    const todayDay = this.allDays.find(
      d =>
        d.day().getMonth() == today.getMonth() &&
        d.day().getDate() === today.getDate()
    );
    if (todayDay) {
      const offset =
        todayDay.elRef.nativeElement.offsetLeft -
        this.scroll.nativeElement.offsetLeft -
        200;
      console.log(offset - this.scroll.nativeElement.offsetLeft);
      this.scroll.nativeElement.scrollLeft = offset;
    }
  }

  isCompleted(date: Date | null) {
    if (!date) {
      return false;
    }

    return this.days().some(d => {
      return (
        d.date.getFullYear() === date.getFullYear() &&
        d.date.getMonth() === date.getMonth() &&
        d.date.getDate() === date.getDate() &&
        d.completed
      );
    });
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
      'border-none': true,
    };
  }

  onExpand() {
    if (this.showDeleteConfirmation) {
      return;
    }
    this.expand.emit();
  }
}
