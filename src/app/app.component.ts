import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <div class="flex flex-col items-center mt-4 gap-4 font-display">
    <div class="w-[48rem]">
      <router-outlet />
    </div>
  </div>`,
  styles: [],
})
export class AppComponent {
  title = 'my-habit-tracker';
}
