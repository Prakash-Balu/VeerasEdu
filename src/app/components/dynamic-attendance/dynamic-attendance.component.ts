import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-dynamic-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-attendance.component.html',
  styleUrl: './dynamic-attendance.component.css',
})
export class DynamicAttendanceComponent implements OnInit {
  title = 'dynamic-attendance-calendar';

  calendar: { date: string; status: string }[] = [];
  currentMonth!: number;
  currentYear!: number;
  daysInMonth!: number;
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ngOnInit() {
    const today = new Date();
    this.currentMonth = today.getMonth(); // Current month (0-based, e.g., 9 for October)
    this.currentYear = today.getFullYear();
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  getMonthName(month: number): string {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[month];
  }

  // Generate calendar dynamically
  generateCalendar(year: number, month: number) {
    this.calendar = [];
    const firstDay = new Date(year, month, 1).getDay();
    this.daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add blank days for the first week
    for (let i = 0; i < firstDay; i++) {
      this.calendar.push({ date: '', status: '' });
    }

    // Fill the rest of the month with days
    for (let day = 1; day <= this.daysInMonth; day++) {
      const date = new Date(year, month, day+1).toISOString().split('T')[0];
      this.calendar.push({ date, status: 'absent' });
    }
  }

  // Toggle attendance
  toggleAttendance(day: any) {
    // if (!day.date) return; // Skip blank cells
    // if (day.status === 'present') {
    //   day.status = 'absent';
    // } else if (day.status === 'absent') {
    //   day.status = '';
    // } else {
    //   day.status = 'present';
    // }
  }

  // Navigate to the previous month
  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  // Navigate to the next month
  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }
}
