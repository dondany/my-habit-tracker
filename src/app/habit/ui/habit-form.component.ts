import {
  Component,
  EventEmitter,
  Output,
  effect,
  inject,
  input,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HabitStore } from '../../shared/data-access/habit.store';
import { Habit } from '../../shared/model/habit';
import { ColorRadioComponent } from './color-radio-component';
import { IconRadioComponent } from './icon-radio.component';

@Component({
  standalone: true,
  selector: 'app-habit-form',
  template: `
    <form
      [formGroup]="form"
      class="flex flex-col gap-3 dark:text-slate-200"
      (ngSubmit)="onSubmit()">
      <div class="flex flex-col gap-2 ">
        <label for="name" class="text-sm font-medium">Name</label>
        <input
          type="text"
          id="name"
          class="p-2 border rounded-lg dark:bg-slate-500 dark:border-transparent"
          formControlName="name" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="description" class="text-sm font-medium">Description</label>
        <input
          type="text"
          id="description"
          class="p-2 border rounded-lg dark:bg-slate-500 dark:border-transparent"
          formControlName="description" />
      </div>

      <span class="text-sm font-medium">Icon</span>
      <div class="grid grid-cols-6 md:grid-cols-12 gap-3">
        <app-icon-radio icon="code" name="icon" formControlName="icon" />
        <app-icon-radio icon="cardiology" name="icon" formControlName="icon" />
        <app-icon-radio icon="water_drop" name="icon" formControlName="icon" />
        <app-icon-radio icon="mood" name="icon" formControlName="icon" />
        <app-icon-radio icon="group" name="icon" formControlName="icon" />
        <app-icon-radio icon="diamond" name="icon" formControlName="icon" />
        <app-icon-radio icon="person" name="icon" formControlName="icon" />

        <app-icon-radio icon="psychology" name="icon" formControlName="icon" />
        <app-icon-radio icon="garden_cart" name="icon" formControlName="icon" />
        <app-icon-radio icon="nutrition" name="icon" formControlName="icon" />
        <app-icon-radio icon="barefoot" name="icon" formControlName="icon" />
        <app-icon-radio icon="palette" name="icon" formControlName="icon" />
        <app-icon-radio
          icon="fitness_center"
          name="icon"
          formControlName="icon" />
        <app-icon-radio icon="camera" name="icon" formControlName="icon" />
        <app-icon-radio
          icon="shopping_cart"
          name="icon"
          formControlName="icon" />
        <app-icon-radio icon="savings" name="icon" formControlName="icon" />
        <app-icon-radio icon="ink_pen" name="icon" formControlName="icon" />
        <app-icon-radio icon="music_note" name="icon" formControlName="icon" />
        <app-icon-radio
          icon="directions_bike"
          name="icon"
          formControlName="icon" />
        <app-icon-radio icon="school" name="icon" formControlName="icon" />
        <app-icon-radio
          icon="self_improvement"
          name="icon"
          formControlName="icon" />
        <app-icon-radio
          icon="construction"
          name="icon"
          formControlName="icon" />
        <app-icon-radio icon="piano" name="icon" formControlName="icon" />
        <app-icon-radio icon="hotel" name="icon" formControlName="icon" />
      </div>

      <span class="text-sm font-medium">Color</span>
      <div class="grid grid-cols-6 md:grid-cols-12 gap-3">
        <app-color-radio name="color" color="red" formControlName="color" />
        <app-color-radio name="color" color="blue" formControlName="color" />
        <app-color-radio name="color" color="green" formControlName="color" />
        <app-color-radio name="color" color="pink" formControlName="color" />
        <app-color-radio name="color" color="yellow" formControlName="color" />
        <app-color-radio name="color" color="indigo" formControlName="color" />
        <app-color-radio name="color" color="slate" formControlName="color" />
        <app-color-radio name="color" color="orange" formControlName="color" />
        <app-color-radio name="color" color="lime" formControlName="color" />
        <app-color-radio name="color" color="purple" formControlName="color" />
        <app-color-radio name="color" color="teal" formControlName="color" />
        <app-color-radio name="color" color="zinc" formControlName="color" />
      </div>

      <button
        type="submit"
        class="ml-auto px-4 py-2  text-white font-medium rounded-lg tracking-tight flex items-center gap-2
        bg-slate-900 hover:bg-slate-600 
        transition-colors duration-300">
        @if (habitStore.saving()) {
          <span class="material-symbols-outlined animate-spin opacity-80">
            progress_activity
          </span>
        }
        <span>Save</span>
      </button>
    </form>
  `,
  imports: [ColorRadioComponent, IconRadioComponent, ReactiveFormsModule],
})
export class HabitFormComponent {
  habitStore = inject(HabitStore);
  habit = input<Habit>();
  @Output() save = new EventEmitter<Habit>();

  form = inject(FormBuilder).group({
    name: new FormControl(this.habit()?.name, Validators.required),
    description: new FormControl(this.habit()?.description),
    icon: new FormControl(this.habit()?.icon),
    color: new FormControl(this.habit()?.color),
  });

  constructor() {
    effect(() => {
      if (this.habit()) {
        this.form.patchValue({
          name: this.habit()?.name,
          description: this.habit()?.description,
          icon: this.habit()?.icon,
          color: this.habit()?.color,
        });
      }
    });
  }

  onSubmit() {
    console.log('sub');
    const habit: Habit = {
      id: this.habit() ? this.habit()!.id : undefined,
      name: this.form.getRawValue().name!,
      description: this.form.getRawValue().description!,
      icon: this.form.getRawValue().icon!,
      days: [],
      color: this.form.getRawValue().color!,
    };
    this.save.emit(habit);
    this.form.reset();
  }
}
