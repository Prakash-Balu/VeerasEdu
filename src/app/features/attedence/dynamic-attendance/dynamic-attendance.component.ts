import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import moment from 'moment';

@Component({
  selector: 'app-dynamic-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-attendance.component.html',
  styleUrl: './dynamic-attendance.component.css',
})
export class DynamicAttendanceComponent {
  title = 'dynamic-attendance-calendar';

  calendar: { date: string; status: string }[] = [];
  currentMonth!: number;
  currentYear!: number;
  daysInMonth!: number;
  weekDays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  momentCurrentMonth: any;
  public attendance: any = [];
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const start = moment().startOf('month');
    this.momentCurrentMonth = start;
    const end = moment().endOf('month');
    this.getAttendance(start, end);
    const today = new Date();
    this.currentMonth = today.getMonth(); // Current month (0-based, e.g., 9 for October)
    this.currentYear = today.getFullYear();
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  getAttendance(start: any, end: any) {
    const payload = {
      start,
      end,
    };
    this.authService.userAttendance(payload).subscribe((resp) => {
      if (resp?.data) {
        this.attendance = resp?.data;
        this.attendance.map((e: any) => {
          e.isoDate = moment(e.createdAt).format('YYYY-MM-DD');
        });
        this.setCalender();
      }
    });
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
      const date = new Date(year, month, day + 1).toISOString().split('T')[0];
      if (date !== '') {
        console.log('date::', date);
        console.log('date::', this.calendar);
        this.calendar.push({ date, status: '' });
      }
    }
  }

  //Set Calender
  setCalender() {
    console.log('b', this.attendance);
    if (this.attendance.length) {
      for (let ele of this.attendance) {
        const findCal = this.calendar.find((e: any) => {
          if (e.date === ele.isoDate) {
            return e;
          }
        });
        if (findCal) {
          findCal.status = ele.isPresent ? 'present' : 'absent';
        }
      }
    }
    console.log(this.calendar);
  }

  // Navigate to the previous month
  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    const start = moment(this.momentCurrentMonth)
      .startOf('month')
      .subtract(1, 'month');
    const end = moment(this.momentCurrentMonth)
      .endOf('month')
      .subtract(1, 'month');
    this.momentCurrentMonth = start;
    this.getAttendance(start, end);
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
    const start = moment(this.momentCurrentMonth)
      .startOf('month')
      .add(1, 'month');

    const end = moment(this.momentCurrentMonth).endOf('month').add(1, 'month');

    this.momentCurrentMonth = start;
    this.getAttendance(start, end);
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
}
