import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly dark = signal(true);

  constructor() {
    const theme = localStorage.getItem('theme');
    this.dark.update(() => (theme === 'dark' || theme === null ? true : false));
  }

  toggle() {
    this.dark.update(value => !value);
    localStorage.setItem('theme', this.dark() ? 'dark' : 'light');
  }
}
