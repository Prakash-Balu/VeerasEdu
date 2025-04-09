import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { last, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { ApiCardId } from '../../modal/interface/card';
import { API_URL } from '../../core/constants/apiUrls';
import { PraticeWithMasterService } from '../../core/services/pratice-with-master.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import AgoraRTC, {
  IAgoraRTCClient,
  ILocalAudioTrack,
  IRemoteAudioTrack,
  IAgoraRTCRemoteUser,
} from 'agora-rtc-sdk-ng';

@Component({
  selector: 'app-pratice-with-master-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pratice-with-master-detail.component.html',
  styleUrl: './pratice-with-master-detail.component.css',
})
export class PraticeWithMasterDetailComponent implements OnInit {
  public praticeWithMasterDetail: any;
  public videoUrl: string = '';
  public mainVideo: boolean = false;
  public currentIndex: number = 0;
  public currentData: any;
  sanitizedVideoUrl: SafeResourceUrl | null = null;

  private client: IAgoraRTCClient;
  private localAudioTrack: ILocalAudioTrack | null = null;

  appId: string = '104c5f7630a84c9e9e7a0a6ead997eb1';
  channelName: string = 'New Channael';
  token: any =
    '007eJxTYCh/b+qruvL6O5FnPB+yfpdFmzEU5xSmnIlW1b6jpXBjb4gCg6GBSbJpmrmZsUGihUmyZaplqnmiQaJZamKKpaV5apKh0v+v6Q2BjAwJds9YGRkgEMTnYfBLLVdwzkjMy0tMzWFgAABM0iJv';
  uid: string = Math.floor(Math.random() * 10000).toString();

  transcriptionResult: string = '';
  public answer: string = 'kya tumane kaaha';
  highlightedText: string = '';

  http = inject(HttpClient);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private praticeWithMasterService: PraticeWithMasterService,
    private sanitizer: DomSanitizer
  ) {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getPraticeWithMasterDetails(params['_id']);
    });

    window.addEventListener('message', this.handleVideoEvent.bind(this));
    this.highlightMatchingText();
    this.joinChannel();
  }

  // highlightText(): string {
  //   let result = '';
  //   for (let i = 0; i < this.answer.length; i++) {
  //     let char = this.answer[i];
  //     if (this.transcriptionResult[i] && this.transcriptionResult[i] === char) {
  //       result += `<span class="highlight">${char}</span>`;
  //     } else {
  //       result += char;
  //     }
  //   }
  //   this.highlighted = result;
  //   return result;
  // }

  // highlightMatchingText() {
  //   let highlighted = '';
  //   for (let i = 0; i < this.answer.length; i++) {
  //     if (this.answer[i] === this.transcriptionResult[i]) {
  //       highlighted += `<span style="
  // background-color: yellow;
  // font-weight: bold;">${this.answer[i]}</span>`;
  // console.log(highlighted)
  //     } else {
  //       highlighted += this.answer[i];
  //     }
  //   }
  //   this.highlightedText = highlighted;
  // }

  highlightMatchingText() {
    const predefinedWords = this.answer.split(' ');
    const transcribedWords = this.transcriptionResult.split(' ');

    let highlighted = '';

    predefinedWords.forEach((word, index) => {
      console.log(
        transcribedWords[index] === word,
        transcribedWords[index],
        word
      );
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
                this.videoUrl = ele.shortUrl;
                return;
              }
            }
          } else {
            this.mainVideo = true;
            this.videoUrl = environment.baseURL + resp.data.videoUrl;
            this.sanitizedVideoUrl =
              this.sanitizer.bypassSecurityTrustResourceUrl(
                `${this.videoUrl}?enablejsapi=1`
              );
          }
        }
      });
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
    console.log('Video playback finished at:', new Date().toISOString());
    if (this.mainVideo === true) {
      console.log('Video playback finished at:', new Date().toISOString());
      this.videoUrl =
        environment.baseURL + this.praticeWithMasterDetail.shorts[0].shortUrl;
      this.currentIndex = 0;
      this.gettingCurrentDate();
      return;
    }
    // Add any additional logic for when the video ends, e.g., API call or analytics
  }

  onVideoLoad(): void {
    // This is a workaround for sending a message to the iframe
    const iframe = document.querySelector('iframe');
    iframe?.contentWindow?.postMessage('checkVideoEnd', '*');
  }

  moveNext() {
    this.currentIndex = this.currentIndex + 1;
    this.videoUrl =
      this.praticeWithMasterDetail.shorts[this.currentIndex]?.shortUrl;
    this.gettingCurrentDate();
  }

  movePrev() {
    this.currentIndex = this.currentIndex - 1;
    this.videoUrl =
      this.praticeWithMasterDetail.shorts[this.currentIndex - 1]?.shortUrl;
    this.gettingCurrentDate();
  }
}
