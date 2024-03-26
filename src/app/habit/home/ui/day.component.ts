import { CommonModule } from '@angular/common';
import { Component, ElementRef, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-day',
  template: ` <div
    class="size-[12px] rounded relative"
    [ngClass]="clazz()"
  ></div>`,
  imports: [CommonModule],
})
export class DayComponent {
  day = input.required<Date>();
  color = input.required<string>();
  isCompleted = input.required<boolean>();

  constructor(public elRef: ElementRef) {}

  clazz() {
    if (!this.day()) {
      return '';
    }
    return this.isCompleted()
      ? this.colorClass()
      : 'bg-slate-300 dark:bg-slate-800';
  }

  colorClass() {
    return {
      'bg-red-400': this.color() === 'red',
      'bg-blue-400': this.color() === 'blue',
      'bg-green-400': this.color() === 'green',
      'bg-pink-400': this.color() === 'pink',
      'bg-yellow-400': this.color() === 'yellow',
      'bg-indigo-400': this.color() === 'indigo',
      'bg-slate-900': this.color() === 'slate' || !this.color(),
      'bg-orange-400': this.color() === 'orange',
      'bg-lime-400': this.color() === 'lime',
      'bg-purple-400': this.color() === 'purple',
      'bg-zinc-400': this.color() === 'zinc',
      'bg-teal-400': this.color() === 'teal',
      'text-white': true,
      'border-none': true,
    };
  }
}
