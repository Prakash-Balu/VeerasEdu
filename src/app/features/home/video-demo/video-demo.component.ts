import {
  AfterViewInit,
  Component,
  ElementRef,
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

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.videPageVeeraImage = this.utilsService.videPageVeeraImage();
  }

  ngAfterViewInit() {
    this.initializePlayer();
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
}
