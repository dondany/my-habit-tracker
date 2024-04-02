import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Habit } from '../model/habit';
import DateUtil from '../util/date.util';
import { HabitService } from './habit.service';

export interface HabitDay {
  date: Date;
  isCompleted: boolean;
}

export interface HabitCalendarState {
  habit: Habit | null;
  year: number;
  month: number;
}

export const HabitCalendarStore = signalStore(
  withState<HabitCalendarState>({
    habit: null,
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  }),
  withMethods((store, habitService = inject(HabitService)) => ({
    loadHabit: rxMethod<string>(
      pipe(
        switchMap(habitId => habitService.getHabit(habitId)),
        tap(habit => patchState(store, { habit }))
      )
    ),
    changeYear(value: number) {
      patchState(store, state => ({ year: state.year + value }));
    },
    changeMonth(value: number) {
      const year =
        store.month() === 11 && value > 0
          ? store.year() + 1
          : store.month() === 0 && value < 0
            ? store.year() - 1
            : store.year();
      const month = (store.month() + value + 12) % 12;

      patchState(store, () => ({ month, year }));
    },
    addDay: rxMethod<Date>(
      pipe(
        switchMap(date => habitService.addDay(store.habit()!.id!, date)),
        switchMap(() => habitService.getHabit(store.habit()!.id!)),
        tap(habit => patchState(store, { habit }))
      )
    ),
    deleteDay: rxMethod<string>(
      pipe(
        switchMap(id => habitService.deleteDay(id)),
        switchMap(() => habitService.getHabit(store.habit()!.id!)),
        tap(habit => patchState(store, { habit }))
      )
    ),
  })),
  withComputed(store => ({
    daysInYear: computed(() => {
      if (!store.habit()) {
        return [];
      }
      const days: HabitDay[] = [];
      const startDate = new Date(Date.UTC(store.year(), 0, 1));
      const endDate = new Date(Date.UTC(store.year(), 11, 31));

      const daysInYear = store
        .habit()!
        .days.filter(day => DateUtil.isDateOfYear(day.date, store.year()));
      for (
        let currentDate = startDate;
        currentDate.getTime() <= endDate.getTime();
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        let isCompleted = false;
        if (daysInYear.some(d => DateUtil.compareDate(d.date, currentDate))) {
          isCompleted = true;
        }

        days.push({
          date: currentDate,
          isCompleted,
        });
      }
      return days;
    }),
    daysInMonth: computed(() => {
      if (store.habit()) {
        return store
          .habit()!
          .days.filter(day =>
            DateUtil.isDateOfMonth(day.date, store.year(), store.month())
          )
          .map(
            day =>
              ({
                date: day.date,
                isCompleted: day.completed,
              }) as HabitDay
          );
      } else {
        return [];
      }
    }),
  }))
);
