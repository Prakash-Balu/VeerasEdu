import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { UtilsService } from '../core/services/utils.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DynamicAttendanceComponent } from '../dynamic-attendance/dynamic-attendance.component';
@Component({
  selector: 'app-attedence',
  standalone: true,
  imports: [CommonModule, RouterLink, DynamicAttendanceComponent],
  templateUrl: './attedence.component.html',
  styleUrl: './attedence.component.css',
})
export class attedenceComponent implements OnInit {
  public smileyIcon!: SafeHtml;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.smileyIcon = this.utilsService.smileyIcon();
  }
}
