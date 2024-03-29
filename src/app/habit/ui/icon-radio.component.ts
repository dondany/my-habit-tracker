import { Component, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-icon-radio',
  template: `
    <div class="w-fit">
      <input
        type="radio"
        [id]="icon()"
        [name]="name()"
        class="hidden peer"
        (change)="onInputChange()"
        [checked]="isChecked" />
      <label
        [for]="icon()"
        class="size-12 p-2 border rounded-lg flex justify-center items-center shadow-sm 
        hover:bg-slate-200 dark:hover:bg-slate-500 cursor-pointer 
        peer-checked:bg-slate-900 peer-checked:text-white 
        transition-colors duration-300"
        (change)="onChange()">
        <span class="material-symbols-outlined text-2xl">
          {{ icon() }}
        </span>
      </label>
    </div>
  `,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IconRadioComponent),
      multi: true,
    },
  ],
})
export class IconRadioComponent implements ControlValueAccessor {
  icon = input.required<string>();
  name = input.required<string>();
  onChange: any = () => {};
  onTouched: any = () => {};
  isChecked: boolean = true;

  writeValue(value: any): void {
    this.isChecked = value === this.icon();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onInputChange(): void {
    this.isChecked = true;
    this.onChange(this.icon());
    this.onTouched();
  }
}
