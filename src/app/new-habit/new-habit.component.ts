import { Component, effect, inject } from '@angular/core';
import { IconRadioComponent } from './ui/icon-radio.component';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Habit } from '../shared/model/habit';
import { HabitStore } from '../shared/data-access/habit.store';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-new-habit',
  template: `<div class="w-full flex flex-col items-center gap-3 ">
    <div class="w-full flex justify-between items-center">
      <button
        class="p-2 flex items-center justify-center rounded-lg hover:bg-slate-200"
        routerLink=".."
      >
        <span class="material-symbols-outlined text-slate-900">
          arrow_back
        </span>
      </button>
      <h1 class="text-2xl tracking-tight font-semibold">New Habit</h1>
      <span class="size-6"></span>
    </div>
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

        <span class="text-sm font-medium">Icon</span>
        <div class="grid grid-cols-12 gap-3">
          <app-icon-radio icon="code" name="icon" formControlName="icon" />
          <app-icon-radio
            icon="cardiology"
            name="icon"
            formControlName="icon"
          />
          <app-icon-radio
            icon="water_drop"
            name="icon"
            formControlName="icon"
          />
          <app-icon-radio icon="mood" name="icon" formControlName="icon" />
          <app-icon-radio icon="group" name="icon" formControlName="icon" />
          <app-icon-radio icon="diamond" name="icon" formControlName="icon" />
          <app-icon-radio icon="person" name="icon" formControlName="icon" />

          <app-icon-radio
            icon="psychology"
            name="icon"
            formControlName="icon"
          />
          <app-icon-radio
            icon="garden_cart"
            name="icon"
            formControlName="icon"
          />
          <app-icon-radio icon="nutrition" name="icon" formControlName="icon" />
          <app-icon-radio icon="barefoot" name="icon" formControlName="icon" />
          <app-icon-radio icon="palette" name="icon" formControlName="icon" />
          <app-icon-radio
            icon="fitness_center"
            name="icon"
            formControlName="icon"
          />
          <app-icon-radio icon="camera" name="icon" formControlName="icon" />
          <app-icon-radio
            icon="shopping_cart"
            name="icon"
            formControlName="icon"
          />
          <app-icon-radio icon="savings" name="icon" formControlName="icon" />
          <app-icon-radio icon="ink_pen" name="icon" formControlName="icon" />
          <app-icon-radio
            icon="music_note"
            name="icon"
            formControlName="icon"
          />
          <app-icon-radio
            icon="directions_bike"
            name="icon"
            formControlName="icon"
          />
          <app-icon-radio icon="school" name="icon" formControlName="icon" />
          <app-icon-radio
            icon="self_improvement"
            name="icon"
            formControlName="icon"
          />
          <app-icon-radio
            icon="construction"
            name="icon"
            formControlName="icon"
          />
          <app-icon-radio icon="piano" name="icon" formControlName="icon" />
          <app-icon-radio icon="hotel" name="icon" formControlName="icon" />
        </div>

        <button
          type="submit"
          class="ml-auto px-4 py-2  bg-slate-900 text-white font-medium rounded-lg tracking-tight flex items-center gap-2"
        >
          @if (habitStore.saving()) {
          <span class="material-symbols-outlined animate-spin opacity-80">
            progress_activity
          </span>
          }
          <span>Save</span>
        </button>
      </form>
    </div>
  </div>`,
  imports: [IconRadioComponent, ReactiveFormsModule, RouterLink],
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
