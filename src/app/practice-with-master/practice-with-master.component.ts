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
  videoObj: any;

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
  public channelName: string = 'NewTw';
  public token: any =
    '007eJxTYPjYxO7PZPGy6GglwwztO6GmyttXGsSt2dmzeNetv401k9oVGAwNTJJN08zNjA0SLUySLVMtU80TDRLNUhNTLC3NU5MMdy7/kd4QyMhwTKCdiZEBAkF8Vga/1PKQcgYGAJUTIQs=';
  public uid: string = Math.floor(Math.random() * 10000).toString();

  public praticeWithMasterDetail: any;
  public transcriptionResult: string = '';
  public answer: string = '';
  public highlightedText: string = '';
  public question: string = '';

  constructor(private praticeWithMasterService: PraticeWithMasterService) {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  }
  ngOnInit(): void {
    this.getPraticeWithMasterDetails('67ec01a9f9ca16aa3577dcaf');
    // AgoraRTC.getDevices().then((devices) => {
    //   devices.forEach((device) => {
    //     console.log(
    //       `${device.kind}: ${device.label} - ${device.deviceId} - groupId: ${device.groupId}`
    //     );
    //   });
    // });
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
          console.log(
            'this.practiceWithMasterDetals:',
            this.praticeWithMasterDetail
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
            this.videoObj = {
              ...this.praticeWithMasterDetail,
              video_url: this.praticeWithMasterDetail.videoUrl,
            };
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

  gettingCurrentData() {
    this.currentData = this.praticeWithMasterDetail.shorts[this.currentIndex];
    this.videoObj = {
      ...this.currentData,
      video_url: this.currentData.shortUrl,
    };
  }

  gettingFirstQuestionData() {
    this.currentData = this.praticeWithMasterDetail.shorts[this.currentIndex];
    this.videoObj = {
      ...this.currentData,
      video_url: this.currentData.shortUrl,
    };
  }

  videoEndEvent(event: any) {
    if (this.mainVideo === true) {
      this.currentIndex = 0;
      this.gettingFirstQuestionData();
      this.mainVideo = false;
    } else {
      this.currentIndex += 1;
    }
  }

  questionVideoStart(event: any) {
    this.question = event;
  }

  answerEmited(event: any) {
    this.answer = event;
  }

  moveNext() {
    this.currentIndex = this.currentIndex + 1;
    this.gettingCurrentData();
  }

  movePrev() {
    this.currentIndex = this.currentIndex - 1;
    this.gettingCurrentData();
  }
}
