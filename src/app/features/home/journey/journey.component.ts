import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.css'
})
export class JourneyComponent implements AfterViewInit {

  // Reference to the video element
    @ViewChild('journey_video', { static: false }) videoElement!: ElementRef;
  
    // Flag to track if the user has scrolled
    private hasScrolled = false;
  
    ngAfterViewInit(): void {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      if (video) {
        video.muted = true;  // Ensure the video is muted initially
      }
    }
  
    @HostListener('window:scroll', ['$event'])
    onWindowScroll(event: Event): void {
      if (!this.hasScrolled) {
        this.hasScrolled = true;  // Mark that the user has scrolled at least once
        this.checkVideoInView();  // Check if the video is in the viewport after scrolling
      }
    }
  
    checkVideoInView(): void {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      const rect = video.getBoundingClientRect();
  
      // Check if the video is in the viewport
      const isInView = rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  
      if (isInView && video.paused) {
        video.play();  // Play the video if it's in the viewport
      }
    }
}
