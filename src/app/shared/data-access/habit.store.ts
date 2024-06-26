import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { of, pipe, switchMap, tap } from 'rxjs';
import { Habit } from '../model/habit';
import { HabitService } from './habit.service';

export interface HabitState {
  habits: Habit[];
  openedHabit: Habit | null;
  daysToDisplay: Date[];
  loading: boolean;
  saving: boolean;
}

export const HabitStore = signalStore(
  { providedIn: 'root' },
  withState<HabitState>({
    habits: [],
    openedHabit: null,
    daysToDisplay: [],
    loading: false,
    saving: false,
  }),
  withMethods(
    (store, habitService = inject(HabitService), router = inject(Router)) => {
      return {
        initHabits: rxMethod<number>(
          pipe(
            switchMap(() => habitService.getHabits()),
            tap(habits => patchState(store, { habits }))
          )
        ),
        openHabit: rxMethod<string>(
          pipe(
            tap(() => patchState(store, { loading: true })),
            switchMap(id => habitService.getHabit(id)),
            tap(habit =>
              patchState(store, { openedHabit: habit, loading: false })
            )
          )
        ),
        addHabit: rxMethod<Habit>(
          pipe(
            tap(() => patchState(store, { saving: true })),
            switchMap(habit => habitService.addHabit(habit)),
            tap(() => patchState(store, { saving: false, loading: true })),
            switchMap(() => habitService.getHabits()),
            tap(habits => patchState(store, { habits, loading: false })),
            tap(() => router.navigate(['/habit']))
          )
        ),
        updateHabit: rxMethod<Habit>(
          pipe(
            tap(() => patchState(store, { saving: true })),
            switchMap(habit => habitService.updateHabit(habit)),
            tap(() => patchState(store, { saving: false, loading: true })),
            switchMap(() => habitService.getHabits()),
            tap(habits => patchState(store, { habits, loading: false })),
            tap(() => router.navigate(['/habit']))
          )
        ),
        deleteHabit: rxMethod<string>(
          pipe(
            switchMap(id => habitService.deleteHabit(id)),
            switchMap(() => habitService.getHabits()),
            tap(habits => patchState(store, { habits, loading: false }))
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
