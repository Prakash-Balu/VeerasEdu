import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiList } from '../modal/interface/card';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { PraticeWithMasterService } from '../core/services/pratice-with-master.service';
@Component({
  selector: 'app-practice-master',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './practice-master.component.html',
  styleUrl: './practice-master.component.css',
})
export class PracticeMasterComponent implements OnInit {
  public praticeWithMasterList: ApiList[] = [];

  http = inject(HttpClient);

  constructor(
    private router: Router,
    private praticeWithMasterService: PraticeWithMasterService
  ) {}

  ngOnInit(): void {
    console.log("initia")
    this.getPraticeWithMaster();
  }

  getApi(name: string, _id: any) {
    this.router.navigateByUrl(`practice-master/${name}/${_id}`);
  }

  getPraticeWithMaster() {
    this.praticeWithMasterService
      .getPraticeWithMasterList()
      .subscribe((resp: any) => {
        if (resp) {
          this.praticeWithMasterList = resp?.data;
        }
      });
  }
}
