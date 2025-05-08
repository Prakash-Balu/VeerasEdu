import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { UtilsService } from '../../../shared/services/utils.service';
import Player from '@vimeo/player';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-video-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-demo.component.html',
  styleUrl: './video-demo.component.css',
})
export class VideoDemoComponent implements OnInit, AfterViewInit {
  videPageVeeraImage!: SafeHtml;
  isVideoPlaying: boolean = false;
  @ViewChild('vimeoPlayer') vimeoPlayerElement!: ElementRef;
  // player!:  Player;
  player!: any;
  // videoId: number = 1019159531;
  videoId: string = 'EngW7tLk6R8';
  // Reference to the video element
  @ViewChild('guide_video', { static: false }) videoElement!: ElementRef;

  // Flag to track if the user has scrolled
  private hasScrolled = false;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.videPageVeeraImage = this.utilsService.videPageVeeraImage();
  }

  ngAfterViewInit() {
    this.initializePlayer();
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    if (video) {
      video.muted = true;  // Ensure the video is muted initially
    }
  }

  initializePlayer() {
    if (!(window as any).YT) {
      // Load YouTube IFrame API dynamically
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);

      // Assign the API ready callback
      (window as any).onYouTubeIframeAPIReady = () => {
        this.createYouTubePlayer();
      };
    } else {
      this.createYouTubePlayer();
    }
    // const options = {
    //   id: this.videoId,
    //   width: 500,
    //   loop: false,
    //   title: false,
    //   byline: false,
    //   portrait: false,
    //   dnt: true,
    //   transparent: false,
    // };

    // this.player = new Player(this.vimeoPlayerElement.nativeElement, options);

    // this.player.on('play', () => {
    //   console.log('Video played!');
    // });
  }

  createYouTubePlayer(): void {
    this.player = new (window as any).YT.Player(
      this.vimeoPlayerElement.nativeElement,
      {
        videoId: this.videoId,
        width: 500,
        height: 360,
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onStateChange: (event: any) => {
            this.isVideoPlaying =
              event.data === (window as any).YT.PlayerState.PLAYING;
          },
        },
      }
    );
  }

  onClickPlayPause() {
    if (this.isVideoPlaying) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo();
    }

    // if (this.isVideoPlaying) {
    //   this.player.pause().then(() => {
    //     this.isVideoPlaying = false; // Update state
    //   }).catch(error => {
    //     console.error('Error pausing the video:', error);
    //   });
    // } else {
    //   this.player.play().then(() => {
    //     this.isVideoPlaying = true; // Update state
    //   }).catch(error => {
    //     console.error('Error playing the video:', error);
    //   });
    // }
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
