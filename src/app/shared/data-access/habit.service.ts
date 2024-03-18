import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Habit } from '../model/habit';
import { map, tap } from 'rxjs';
import { Day } from '../model/day';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  http = inject(HttpClient);

  BASE_URL = 'http://localhost:8000';

  getHabits() {
    return this.http.get<Habit[]>(`${this.BASE_URL}/habits?_embed=days`);
  }

  addHabit(habit: Habit) {
    return this.http.post<Habit>(`${this.BASE_URL}/habits`, habit);
  }

  deleteHabit(id: string) {
    return this.http.delete(`${this.BASE_URL}/habits/${id}`);
  }

  addDay(habitId: string, date: Date) {
    return this.http.post<Day>(`${this.BASE_URL}/days`, {
      date,
      completed: true,
      habitId,
    });
  }

  deleteDay(id: string) {
    return this.http.delete(`${this.BASE_URL}/days/${id}`);
  }
}
