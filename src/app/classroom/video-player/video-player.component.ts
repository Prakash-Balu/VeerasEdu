import {Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent {
  @ViewChild('vimeoPlayer') vimeoPlayerElement!: ElementRef;
  @Input() videoObj: { video_url?: string, _id?: string } = {};
  sanitizedVideoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngAfterViewInit() {
    this.updateSanitizedVideoUrl();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoObj']) {
      this.updateSanitizedVideoUrl();
    }
  }

  private updateSanitizedVideoUrl() {
    if (this.videoObj.video_url) {
      const videoUrl = this.videoObj.video_url.replace(/&amp;/g, '&');
      this.sanitizedVideoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }
  }
}
