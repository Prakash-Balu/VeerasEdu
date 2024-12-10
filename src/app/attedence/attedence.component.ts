import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { UtilsService } from '../core/services/utils.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-attedence',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './attedence.component.html',
  styleUrl: './attedence.component.css'
})
export class attedenceComponent implements OnInit {
  public smileyIcon!: SafeHtml;
  public data: any = [
    { Sunday: '', Monday: '', Tuesday: '1', Wednesday: '2', Thursday: '3', Friday: '4', Saturday: '5' },
    { Sunday: '6', Monday: '7', Tuesday: '8', Wednesday: '9', Thursday: '10', Friday: '11', Saturday: '12' },
    { Sunday: '13', Monday: '14', Tuesday: '15', Wednesday: '16', Thursday: '17', Friday: '18', Saturday: '19' },
    { Sunday: '20', Monday: '21', Tuesday: '22', Wednesday: '23', Thursday: '24', Friday: '25', Saturday: '26' },
    { Sunday: '27', Monday: '28', Tuesday: '29', Wednesday: '30', Thursday: '31', Friday: '', Saturday: '' },
  ]

  constructor(
    private utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.smileyIcon = this.utilsService.smileyIcon()
  }
}
