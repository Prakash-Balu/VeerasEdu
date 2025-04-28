import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-preloader',
  standalone: true,
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.css'
})
export class PreloaderComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.muted = true;  // Ensure the video is muted
      video.play().catch((error) => {
        console.error("Autoplay failed: ", error);
      });
    }
  }

}
