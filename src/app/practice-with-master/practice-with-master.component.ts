import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VideoPracticeComponent } from './video-practice/video-practice.component';
import { MaterialModule } from '../material-module';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  IRemoteAudioTrack,
} from 'agora-rtc-sdk-ng';
import { PraticeWithMasterService } from '../core/services/pratice-with-master.service';
import Player from '@vimeo/player';

@Component({
  selector: 'app-practice-with-master',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    VideoPracticeComponent,
    MaterialModule,
  ],
  templateUrl: './practice-with-master.component.html',
  styleUrls: [
    './practice-with-master.component.css',
    '../../assets/scss/main.scss',
  ],
})
export class PracticeWithMasterComponent implements OnInit {
  @ViewChild('vimeoPlayer') vimeoPlayerElement!: ElementRef;
  player!: Player;
  videoId: number = 1019160112;
  videoObj: any = {
    "_id": "6735c99727a6da66983a3096",
    "name": "SEGMENT-1",
    "description": "SEGMENT-1",
    "video_url": "https://player.vimeo.com/video/1073867761?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    "pageName": "classroom",
    "routeUrl": "class-room",
    "createdAt": "2024-11-14T09:57:43.692Z",
    "updatedAt": "2024-11-14T09:57:43.692Z",
    "__v": 0
  };

  segmentlist = [
    'INDEX',
    'SEGMENT 1- 10',
    'SEGMENT 1',
    'SEGMENT 2',
    'SEGMENT 3',
    'SEGMENT 4',
    'SEGMENT 5',
    'SEGMENT 6',
    'SEGMENT 7',
    'SEGMENT 8',
    'SEGMENT 9',
    'SEGMENT 10',
    'SEGMENT 11- 20',
    'SEGMENT 11',
    'SEGMENT 12',
    'SEGMENT 13',
    'SEGMENT 14',
    'SEGMENT 15',
  ];

  audioBlob: Blob | null = null;
  audioURL: string | null = null;
  private recognition: any;

  isListen = false;
  isRecording = false;

  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  transcription: string = '';

  public mainVideo: boolean = false;

  public currentIndex: number = 0;
  public currentData: any;

  private client: IAgoraRTCClient;
  private localAudioTrack: ILocalAudioTrack | null = null;

  public appId: string = '104c5f7630a84c9e9e7a0a6ead997eb1';
  public channelName: string = 'New One';
  public token: any =
    '007eJxTYJhz82ZC39zeb8F8zztczf/HKD04ExcyO/Gj4HSTm1cTXOwVGAwNTJJN08zNjA0SLUySLVMtU80TDRLNUhNTLC3NU5MMmzy+pzcEMjJs2/+WiZEBAkF8dga/1HIF/7xUBgYASvsivg==';
  public uid: string = Math.floor(Math.random() * 10000).toString();

  public praticeWithMasterDetail: any;
  public transcriptionResult: string = '';
  public answer: string = '';
  public highlightedText: string = '';


  constructor(private praticeWithMasterService: PraticeWithMasterService) {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  }
  ngOnInit(): void {
    window.addEventListener('message', this.handleVideoEvent.bind(this));
    this.getPraticeWithMasterDetails('67ec01a9f9ca16aa3577dcaf');
  }

  getPraticeWithMasterDetails(id: string) {
    this.praticeWithMasterService
      .getPraticeWithMasterById(id)
      .subscribe((resp: any) => {
        if (resp) {
          this.praticeWithMasterDetail = resp.data;
          const isPreWatched = this.praticeWithMasterDetail.shorts.find(
            (e: any) => e.watched === true
          );
          if (isPreWatched) {
            for (const [
              index,
              ele,
            ] of this.praticeWithMasterDetail.shorts.entries()) {
              console.log(`Index: ${index}, Video URL: ${ele}`);
              if (!ele.watched) {
                this.currentIndex = index;
                // this.videoUrl = ele.shortUrl;
                return;
              }
            }
          } else {
            this.mainVideo = true;
            // this.videoUrl = environment.baseURL + resp.data.videoUrl;
            // this.sanitizedVideoUrl =
            //   this.sanitizer.bypassSecurityTrustResourceUrl(
            //     `${this.videoUrl}?enablejsapi=1`
            //   );
          }
        }
      });
  }

  highlightMatchingText() {
    const predefinedWords = this.answer.split(' ');
    const transcribedWords = this.transcriptionResult.split(' ');

    let highlighted = '';

    predefinedWords.forEach((word, index) => {
      if (transcribedWords[index] === word) {
        highlighted += `<span class="highlight">${word}</span> `;
      } else {
        highlighted += `${word} `;
      }
    });

    this.highlightedText = highlighted.trim(); // Remove trailing space
  }

  async joinChannel() {
    try {
      await this.client.join(
        this.appId,
        this.channelName,
        this.token,
        this.uid
      );
      console.log('Audio track publishe wwd');

      this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await this.client.publish([this.localAudioTrack]);
      console.log('Audio track published');

      this.initializeSpeechRecognition();
      this.subscribeToRemoteAudio();
    } catch (error) {
      console.error('Failed to join channel:', error);
    }
  }

  initializeSpeechRecognition() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const lastResult = event.results[event.results.length - 1];
      console.log('lastResult::', lastResult);
      this.highlightMatchingText();
      if (lastResult.isFinal) {
        this.transcriptionResult += ' ' + lastResult[0].transcript;
        this.transcriptionResult = this.transcriptionResult.trim();
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech Recognition Error:', event.error);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended, restarting...');
      recognition.start(); // Restart on end to maintain real-time transcription
    };

    recognition.start();
  }

  subscribeToRemoteAudio() {
    this.client.on(
      'user-published',
      async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
        await this.client.subscribe(user, mediaType);
        console.log('Subscribed to remote user:', user.uid);

        if (mediaType === 'audio') {
          const remoteAudioTrack = user.audioTrack as IRemoteAudioTrack;
          remoteAudioTrack.play();
        }
      }
    );
  }

  gettingCurrentDate() {
    this.currentData = this.praticeWithMasterDetail.shorts[this.currentIndex];
  }

  handleVideoEvent(event: MessageEvent): void {
    console.log(event);
    if (event.data === 'videoEnded') {
      console.log('Video playback finished at:', new Date().toISOString());
    }
  }

  onVideoEnded(): void {
    if (this.mainVideo === true) {
      this.currentIndex = 0;
      this.gettingCurrentDate();
      return;
    }
    // Add any additional logic for when the video ends, e.g., API call or analytics
  }

  moveNext() {
    this.currentIndex = this.currentIndex + 1;
    this.gettingCurrentDate();
  }

  movePrev() {
    this.currentIndex = this.currentIndex - 1;
    this.gettingCurrentDate();
  }
}
