import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { ApiCardId } from '../../modal/interface/card';
import { API_URL } from '../../core/constants/apiUrls';
import { PraticeWithMasterService } from '../../core/services/pratice-with-master.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pratice-with-master-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pratice-with-master-detail.component.html',
  styleUrl: './pratice-with-master-detail.component.css',
})
export class PraticeWithMasterDetailComponent implements OnInit {
  public praticeWithMasterDetail: any;
  videoUrl: string = '';
  sanitizedVideoUrl: SafeResourceUrl | null = null;
  http = inject(HttpClient);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private praticeWithMasterService: PraticeWithMasterService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getPraticeWithMasterDetails(params['_id']);
    });

    window.addEventListener('message', this.handleVideoEvent.bind(this));
  }

  getPraticeWithMasterDetails(id: string) {
    this.praticeWithMasterService
      .getPraticeWithMasterById(id)
      .subscribe((resp: any) => {
        if (resp) {
          this.praticeWithMasterDetail = resp.data;
          this.videoUrl = environment.baseURL + resp.data.videoUrl;
          this.sanitizedVideoUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(
              `${this.videoUrl}?enablejsapi=1`
            );
          console.log(this.sanitizedVideoUrl);
        }
      });
  }

  handleVideoEvent(event: MessageEvent): void {
    console.log(event)
    if (event.data === 'videoEnded') {
      console.log('Video playback finished at:', new Date().toISOString());
    }
  }

  onVideoLoad(): void {
    // This is a workaround for sending a message to the iframe
    const iframe = document.querySelector('iframe');
    iframe?.contentWindow?.postMessage('checkVideoEnd', '*');
  }
}
