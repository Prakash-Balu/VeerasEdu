import { Component, inject, OnInit } from '@angular/core';
import { ApiCardId, ApiResponse } from '../../modal/interface/card';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-segment1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './segment1.component.html',
  styleUrl: './segment1.component.css',
})
export class Segment1Component implements OnInit {
  apiVideoId: ApiCardId[] = [];

  http = inject(HttpClient);

  ngOnInit(): void {
    this.getApiVideo();
  }
  getApiVideo() {
    this.http
      .get('http://192.168.0.12:3000/practicewithmasterCustomer/getPractice/')
      .subscribe((res: any) => {
        this.apiVideoId = res.data;
      });
  }
}
