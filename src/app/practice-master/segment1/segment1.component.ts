import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { ApiCardId } from '../../modal/interface/card';
import { API_URL } from '../../core/constants/apiUrls';

@Component({
  selector: 'app-segment1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './segment1.component.html',
  styleUrl: './segment1.component.css',
})
export class Segment1Component implements OnInit {
  apiVideoId: ApiCardId[] = [];
  videoUrl: string = '';
  http = inject(HttpClient);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getVideoApi(params['_id']);

      // this.getApiVideo();
    });
  }

  getVideoApi(_id: string) {
    this.authservice.apiVideoSegment(_id).subscribe((resp) => {
      if (resp) {
        console.log('item', resp);
        this.apiVideoId = resp.data;
      }
    });
  }

  //  getVideoApi(_id: string) {
  //   this.authservice.apiVideoSegment(_id).subscribe((resp) => {
  //     if (resp && resp.data) {
  //       console.log('item', resp);
  //       this.apiVideoId = resp.data;
  //       if(this.apiVideoId.length>0){
  //         this.videoUrl=this.apiVideoId[0].videoUrl;
  //       }
  //     }

  //   });
  // }
  // getApiVideo(_id: string) {
  //   this.http
  //     .get(
  //       environment.baseURL+'/practicewithmasterCustomer/getPractice/' + _id,{headers:this.getVideoApi()}
  //     )
  //     .subscribe((res: any) => {
  //       this.apiVideoId = res.data;
  //     });
  // }
}
