import { Component, inject } from '@angular/core';
import { IconRadioComponent } from './ui/icon-radio.component';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Habit } from '../shared/model/habit';
import { HabitStore } from '../shared/data-access/habit.store';

@Component({
  standalone: true,
  selector: 'app-new-habit',
  template: `<div class="w-full flex flex-col items-center gap-3 ">
    <h1 class="text-2xl tracking-tight font-semibold">New Habit</h1>
    <div
      class="w-full p-4 flex flex-col gap-3 border rounded-xl bg-white shadow-sm"
    >
      <form
        [formGroup]="form"
        class="flex flex-col gap-3"
        (ngSubmit)="onSubmit()"
      >
        <div class="flex flex-col gap-2">
          <label for="name" class="text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            class="p-2 border rounded-lg"
            formControlName="name"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="description" class="text-sm font-medium"
            >Description</label
          >
          <input
            type="text"
            id="description"
            class="p-2 border rounded-lg"
            formControlName="description"
          />
        </div>

        <app-icon-radio icon="code" name="icon" formControlName="icon" />
        <app-icon-radio icon="add" name="icon" formControlName="icon" />

        <button
          type="submit"
          class="ml-auto px-4 py-2 bg-slate-900 text-white font-medium rounded-lg tracking-tight flex items-center gap-1"
        >
          <span>Save</span>
        </button>
      </form>
    </div>
  </div>`,
  imports: [IconRadioComponent, ReactiveFormsModule],
})
export default class NewHabitComponent {
  habitStore = inject(HabitStore);

  form = inject(FormBuilder).group({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    icon: new FormControl(''),
  });

  onSubmit() {
    const habit: Habit = {
      name: this.form.getRawValue().name!,
      description: this.form.getRawValue().description!,
      icon: this.form.getRawValue().icon!,
      days: [],
    };
    this.habitStore.addHabit(habit);
  }
}
