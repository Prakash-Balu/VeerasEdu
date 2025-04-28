import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { UtilsService } from '../../core/services/utils.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DynamicAttendanceComponent } from './dynamic-attendance/dynamic-attendance.component';
import moment from 'moment';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-attedence',
  standalone: true,
  imports: [CommonModule, RouterLink, DynamicAttendanceComponent],
  templateUrl: './attedence.component.html',
  styleUrl: './attedence.component.css',
})
export class attedenceComponent implements OnInit {
  public smileyIcon!: SafeHtml;
  public attendance: any = [];
  showAbsent: boolean = false;

  constructor(
    private utilsService: UtilsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.smileyIcon = this.utilsService.smileyIcon();
  }

  getAttendance(start: any, end: any) {
    const payload = {
      start,
      end,
    };
    this.authService.userAttendance(payload).subscribe((resp) => {
      if (resp?.data) {
        const currentDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
        this.attendance = resp?.data;
        this.attendance.map((e: any) => {
          e.isoDate = moment(e.createdAt).format('YYYY-MM-DD');
          if (e.isoDate === currentDate) {
            this.showAbsent = true;
          }
        });
      }
    });
  }
}
