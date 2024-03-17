import { CommonModule } from '@angular/common';
import { Component, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-color-radio',
  template: `
    <div class="w-fit">
      <input
        type="radio"
        [id]="color()"
        [name]="name()"
        class="hidden peer"
        (change)="onInputChange()"
      />
      <label
        [for]="color()"
        class="size-12 p-2 border rounded-lg flex justify-center items-center shadow-sm cursor-pointer hover:bg-slate-50 peer-checked:border-slate-900 transition-colors duration-300"
        (change)="onChange()"
      >
        <div
          class="aspect-square size-10 rounded-lg"
          [ngClass]="colorClass()"
        ></div>
      </label>
    </div>
  `,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorRadioComponent),
      multi: true,
    },
  ],
})
export class ColorRadioComponent implements ControlValueAccessor {
  color = input<string>('slate');
  name = input.required<string>();
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {}
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onInputChange(): void {
    this.onChange(this.color());
    this.onTouched();
  }

  colorClass() {
    return {
      'bg-red-400': this.color() === 'red',
      'bg-blue-400': this.color() === 'blue',
      'bg-green-400': this.color() === 'green',
      'bg-pink-400': this.color() === 'pink',
      'bg-yellow-400': this.color() === 'yellow',
      'bg-indigo-400': this.color() === 'indigo',
      'bg-slate-900': this.color() === 'slate',
      'bg-orange-400': this.color() === 'orange',
      'bg-lime-400': this.color() === 'lime',
      'bg-purple-400': this.color() === 'purple',
      'bg-zinc-400': this.color() === 'zinc',
      'bg-teal-400': this.color() === 'teal',
    };
  }
}
