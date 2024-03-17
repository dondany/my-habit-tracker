import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { of, pipe, switchMap, tap } from 'rxjs';
import { Habit, ToggleHabit } from '../model/habit';
import { HabitService } from './habit.service';
import { Router } from '@angular/router';

export interface HabitState {
  habits: Habit[];
  daysToDisplay: Date[];
  loading: boolean;
  saving: boolean;
}

export const HabitStore = signalStore(
  { providedIn: 'root' },
  withState<HabitState>({
    habits: [],
    daysToDisplay: [],
    loading: false,
    saving: false,
  }),
  withMethods(
    (store, habitService = inject(HabitService), router = inject(Router)) => {
      return {
        init: rxMethod<number>(
          pipe(
            switchMap((year) => generateYearDays(year)),
            tap((days) => patchState(store, { daysToDisplay: days }))
          )
        ),
        initHabits: rxMethod<number>(
          pipe(
            switchMap((year) => habitService.getHabits()),
            tap((habits) => patchState(store, { habits }))
          )
        ),
        addHabit: rxMethod<Habit>(
          pipe(
            tap(() => patchState(store, { saving: true })),
            switchMap((habit) => habitService.addHabit(habit)),
            tap(() => patchState(store, { saving: false, loading: true })),
            switchMap((year) => habitService.getHabits()),
            tap((habits) => patchState(store, { habits, loading: false })),
            tap(() => router.navigate(['/home']))
          )
        ),
        addDay: rxMethod<ToggleHabit>(
          pipe(
            switchMap((update) => habitService.addDay(update.id, update.date)),
            switchMap((year) => habitService.getHabits()),
            tap((habits) => patchState(store, { habits }))
          )
        ),
        deleteDay: rxMethod<string>(
          pipe(
            switchMap((id) => habitService.deleteDay(id)),
            switchMap((year) => habitService.getHabits()),
            tap((habits) => patchState(store, { habits }))
          )
        ),
      };
    }
  )
);

function generateYearDays(year: number) {
  const days: Date[] = [];
  const startDate = new Date(Date.UTC(year, 0, 1));
  const endDate = new Date(Date.UTC(year, 11, 31));
  for (
    let currentDate = startDate;
    currentDate.getTime() <= endDate.getTime();
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    days.push(new Date(currentDate));
  }
  return of(days);
}
