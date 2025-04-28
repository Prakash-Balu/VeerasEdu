import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import Player from '@vimeo/player';

@Component({
  selector: 'app-video-practice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-practice.component.html',
  styleUrl: './video-practice.component.css',
})
export class VideoPracticeComponent {
  @Input() videoObj: {
    video_url?: string;
    _id?: string;
    question?: string;
    answer?: string;
  } = {};
  sanitizedVideoUrl!: SafeResourceUrl;

  @ViewChild('vimeoIframe') vimeoIframeRef!: ElementRef;

  @Output() hasVideoEnd = new EventEmitter<any>();
  @Output() hasQuestionVideoStart = new EventEmitter<any>();
  @Output() hasAnswerEmit = new EventEmitter<any>();

  player: any;

  constructor(private sanitizer: DomSanitizer) {}

  ngAfterViewInit() {
    if (this.vimeoIframeRef && this.vimeoIframeRef.nativeElement) {
      this.initVimeoPlayer();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoObj']) {
      this.updateSanitizedVideoUrl();

      setTimeout(() => {
        // Destroy existing player if any
        if (this.player) {
          this.player.unload().then(() => {
            this.player = null;
            console.log('🔄 Previous player unloaded');
            this.player = new Player(this.vimeoIframeRef.nativeElement);
            this.initVimeoPlayer();
          });
        } else {
          this.player = new Player(this.vimeoIframeRef.nativeElement);

          this.initVimeoPlayer();
        }
      }, 100);
    }
  }

  initVimeoPlayer() {
    try {
      this.player
        .ready()
        .then(() => {
          console.log('✅ Vimeo Player is ready.');
          if (this.videoObj?.question) {
            this.hasQuestionVideoStart.emit(this.videoObj.question);
          }

          this.player.getDuration().then((duration: number) => {
            // this.videoDuration = duration;
            console.log('📽️ Video duration:', duration);
          });

          // Auto-play the video
          this.player?.play().catch((err: any) => {
            console.warn('Autoplay failed:', err.name);
          });

          this.player?.on('play', () => {
            console.log('▶️ Video started');
          });

          this.player?.on('pause', () => {
            console.log('⏸️ Video paused');
          });

          this.player.on('ended', () => {
            console.log('🎬 Video playback ended!');
            this.hasVideoEnd.emit(true);
            if (this.videoObj.answer) {
              this.hasAnswerEmit.emit(this.videoObj.answer);
            }
          });
        })
        .catch((error: any) => {
          console.error('Vimeo player error:', error);
        });
    } catch (err) {
      console.error('Player init error:', err);
    }
  }

  private updateSanitizedVideoUrl() {
    if (this.videoObj.video_url) {
      console.log(this.videoObj.video_url);
      const videoUrl = this.videoObj.video_url.replace(/&amp;/g, '&');
      this.sanitizedVideoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }
  }
}
