import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiList } from '../modal/interface/card';
import { inject } from '@angular/core';
import { PraticeWithMasterService } from '../core/services/pratice-with-master.service';
@Component({
  selector: 'app-practice-master',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './practice-master.component.html',
  styleUrl: './practice-master.component.css',
})
export class PracticeMasterComponent implements OnInit {
  apiCard: ApiList[] = [];

  http = inject(HttpClient);

  constructor(
    private readonly praticeWithMasterService: PraticeWithMasterService
  ) {}

  ngOnInit(): void {
    this.getPraticeWithMaster();
  }

  getPraticeWithMaster() {
    this.praticeWithMasterService
      .getPraticeWithMasterList()
      .subscribe((resp: any) => {
        if (resp) {
          this.apiCard = resp?.data;
        }
      });
  }
}
