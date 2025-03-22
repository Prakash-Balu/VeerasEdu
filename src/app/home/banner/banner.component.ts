import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements AfterViewInit {

  // Reference to the video element
  @ViewChild('slider_video', { static: false }) videoElement!: ElementRef;

  ngAfterViewInit(): void {
    // const video = document.querySelector('video') as HTMLVideoElement;
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    if (video) {
      video.muted = true;  // Ensure the video is muted
      video.play().catch((error) => {
        console.error("Autoplay failed: ", error);
      });
    }
  }
}
