import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-swarmify-player',
  standalone: true,
  imports: [],
  templateUrl: './swarmify-player.component.html',
  styleUrl: './swarmify-player.component.css',
})
export class SwarmifyPlayerComponent implements AfterViewInit {
  @ViewChild('swarmVideo') videoRef!: ElementRef<HTMLVideoElement>;
  public videoUrl: string =
    'swarmify://a0beca3609e7c0988a78dc2c584541064d19bf45856e3f01ee82a7a8d75631b9';

  sanitizedVideoUrl!: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoUrl']) {
      this.updateSanitizedVideoUrl();
    }
  }

  private updateSanitizedVideoUrl() {
    if (this.videoUrl) {
      const url = this.videoUrl.replace(/&amp;/g, '&');
      this.sanitizedVideoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  ngAfterViewInit(): void {
      this.videoRef.nativeElement.addEventListener('play', (event) => {
        console.log('Video1 started (using ViewChild)', event);
      });
      const video = this.videoRef.nativeElement;
      video.addEventListener('timeupdate', () => {
        const remaining = video.duration - video.currentTime;
        if (remaining <= 10) {
          console.log(
            `⏳ Last 10 seconds! Time remaining: ${remaining.toFixed(2)}s`
          );
        }
      });
      video.addEventListener('play', (event) => {
        console.log('Video started (using ViewChild)', event);
      });
      video.onloadedmetadata = () => {
        console.log('🎞️ Video duration:', video.duration);
      };
      video.onplay = (event) => {
        console.log('Video1 started (using ViewChild)', event);
      };
  }

  onVideoEnded() {
    console.log('✅ Swarmify video has ended');
  }

  onVideoPlay() {
    console.log('▶️ Video started');
  }

  onVideoPause() {
    console.log('⏸️ Video paused');
  }
}
