import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './shared/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ` <div
    class="h-screen flex flex-col items-center gap-4 font-display bg-zinc-50 dark:bg-slate-800"
    [ngClass]="{ dark: themeService.dark() }"
  >
    <div class="w-96 md:w-[48rem] mt-3">
      <router-outlet />
    </div>
  </div>`,
  imports: [RouterOutlet, CommonModule],
  styles: [],
})
export class AppComponent {
  themeService = inject(ThemeService);
  title = 'my-habit-tracker';
}
