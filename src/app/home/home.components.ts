import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivityCalendarComponent } from './activity-calendar.component';
import { Day } from './day';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div class="flex justify-center mt-4">
      <div class="flex flex-col gap-1">
        <span class="">Learn frontend</span>
        <span class="text-sm"
          >Spend at least 30mins on learning frontend dev</span
        >
        <app-activity-calendar [days]="days" [startDate]="startDate" />
        <button (click)="onClick()">check</button>
      </div>
    </div>
  `,
  imports: [CommonModule, ActivityCalendarComponent],
})
export default class HomeComponent implements OnInit {
  myYear = 2024;
  startDate = new Date(this.myYear, 0, 1);
  days: Day[] = [];
  activityDays: Day[] = [
    {
      date: new Date(this.myYear, 0, 1),
      completed: true,
    },
    {
      date: new Date(this.myYear, 0, 7),
      completed: true,
    },
    {
      date: new Date(this.myYear, 0, 8),
      completed: true,
    },
    {
      date: new Date(this.myYear, 0, 11),
      completed: true,
    },
    {
      date: new Date(this.myYear, 0, 12),
      completed: true,
    },
    {
      date: new Date(this.myYear, 1, 12),
      completed: true,
    },
    {
      date: new Date(this.myYear, 1, 13),
      completed: true,
    },
    {
      date: new Date(this.myYear, 1, 14),
      completed: true,
    },
  ];

  ngOnInit(): void {
    const days: Day[] = [];
    const startDate = new Date(this.myYear, 0, 1);
    const endDate = new Date(this.myYear, 11, 31);
    for (
      let currentDate = startDate;
      currentDate.getTime() <= endDate.getTime();
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      const completed = this.activityDays.some(
        (day) => day.date.getTime() == currentDate.getTime()
      );
      days.push({ date: new Date(currentDate), completed });
    }
    this.days = days;
  }

  onClick() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();
    this.days = this.days.map((d) => {
      if (d.date.getTime() === todayTime) {
        return { date: d.date, completed: !d.completed };
      }
      return d;
    });
  }
}
