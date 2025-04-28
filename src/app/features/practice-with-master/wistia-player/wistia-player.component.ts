import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

declare var Wistia: any;

@Component({
  selector: 'app-wistia-player',
  standalone: true,
  imports: [],
  templateUrl: './wistia-player.component.html',
  styleUrl: './wistia-player.component.css',
})
export class WistiaPlayerComponent implements AfterViewInit {
  @Input() videoObj: any;
  @Input() hashedId!: string; // Ex: 'abcde12345'
  @Output() mainVideoEndEventEmitter = new EventEmitter<any>();
  @Output() questionVideoStartEventEmitter = new EventEmitter<any>();
  @Output() questionVideoEndEventEmitter = new EventEmitter<any>();

  @ViewChild('playerContainer', { static: false }) playerContainer!: ElementRef;

  wistiaPlayer: any;

  constructor() {}

  ngAfterViewInit() {
    this.initPlayer();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoObj'] && !changes['videoObj'].firstChange) {
      this.initPlayer();
    }
  }

  initPlayer() {
    const container = this.playerContainer.nativeElement;
    container.innerHTML = ''; // Reset container

    const embedDiv = document.createElement('div');
    embedDiv.className = `wistia_embed wistia_async_${this.videoObj.videoId}`;
    embedDiv.setAttribute('style', 'width:100%;height:100%;');
    embedDiv.setAttribute('videoFoam', 'true');
    container.appendChild(embedDiv);

    // Wait for Wistia script to load
    (window as any)._wq = (window as any)._wq || [];
    (window as any)._wq.push({
      id: this.videoObj.videoId,
      onReady: (video: any) => {
        console.log('✅ Wistia Player Ready');
        if (this.videoObj.question) {
          this.questionVideoStartEventEmitter.emit(this.videoObj.question);
        }
        // Test Events
        video.bind('play', () => console.log('▶️ Play Event Triggered'));
        video.bind('pause', () => console.log('⏸️ Pause Event Triggered'));
        video.bind('end', () => {
          console.log('🏁 End Event Triggered');
          if (this.videoObj.mainVideo) {
            this.mainVideoEndEventEmitter.emit(true);
          } else {
            this.questionVideoEndEventEmitter.emit(this.videoObj.answer);
          }
        });
        video.bind('secondchange', (s: number) => {
          console.log('⏱️ Time:', s);
          const duration = video.duration();
          if (duration - s <= 10 && duration - s > 9.9) {
            console.log('🎯 Reached last 10 seconds!', s);
            // Trigger your logic here
          }
        });
        // ✅ Transcription embed (if available)
        video.bind('transcriptchange', (transcript: any) => {
          console.log('📄 Transcript updated:', transcript);
        });
        video.bind('timechange', (t: number) => {
          const duration = video.duration();
          if (duration - t <= 10 && duration - t > 9.9) {
            console.log('🎯 Reached last 10 seconds!');
            // Trigger your logic here
          }
        });

        video.bind('captions', (captions: any) => {
          console.log('captions::', captions);
          // captions.setSubtitlesScale(1.2);
          // captions.getSubtitlesScale(); // returns 1.2
        });
      },
    });
  }
}
