import { Day } from './day';

export interface Habit {
  id?: string;
  icon?: string;
  name?: string;
  description?: string;
  days: Day[];
}

export interface ToggleHabit {
  id: string;
  date: Date;
}
