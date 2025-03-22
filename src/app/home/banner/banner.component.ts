import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements AfterViewInit  {

  sanitizedVideoUrl!: SafeResourceUrl;
  videoUrl = "assets/videos/SLIDE 02_3.mp4"
  // Reference to the video element
  @ViewChild('slider_video', { static: false }) videoElement!: ElementRef;

  constructor(private sanitizer: DomSanitizer) {
    this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  ngAfterViewInit() {
    this.setupVisibilityChangeListener();
  }

  // Set up visibility change listener to detect when the page becomes visible/inactive
  setupVisibilityChangeListener() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  handleVisibilityChange() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    // Check if the document is visible (in focus)
    if (document.visibilityState === 'visible') {
      // Try to play the video when the page is active
      video.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    } else {
      // Pause the video when the page is not visible
      video.pause();
    }
  }

  playVideo() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    video.play().catch((error) => {
      console.error('Error playing video:', error);
    });
  }

}
