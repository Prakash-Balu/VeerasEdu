import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import AgoraRTC, {
  IAgoraRTCClient,
  ILocalAudioTrack,
  IRemoteAudioTrack,
  IAgoraRTCRemoteUser,
} from 'agora-rtc-sdk-ng';
import { PraticeWithMasterService } from '../core/services/pratice-with-master.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pracitce-with-master-new',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pracitce-with-master-new.component.html',
  styleUrl: './pracitce-with-master-new.component.css',
})
export class PracitceWithMasterNewComponent {
  public mainVideo: boolean = false;

  public currentIndex: number = 0;
  public currentData: any;

  private client: IAgoraRTCClient;
  private localAudioTrack: ILocalAudioTrack | null = null;

  appId: string = '104c5f7630a84c9e9e7a0a6ead997eb1';
  channelName: string = 'New';
  token: any =
    '007eJxTYLibbXhr8ZfW8M6ome/X6lUkBUZ0uM62iJi50uTqasXEb94KDIYGJsmmaeZmxgaJFibJlqmWqeaJBolmqYkplpbmqUmGly/cTm8IZGTY81SHmZEBAkF8Zga/1HIGBgCTrSEE';
  uid: string = Math.floor(Math.random() * 10000).toString();

  public praticeWithMasterDetail: any;

  public transcriptionResult: string = '';
  public answer: string = 'kya tumane kaaha';
  public highlightedText: string = '';

  constructor(
    private route: ActivatedRoute,
    private praticeWithMasterService: PraticeWithMasterService
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
      // this.videoUrl =
      //   environment.baseURL + this.praticeWithMasterDetail.shorts[0].shortUrl;
      this.currentIndex = 0;
      this.gettingCurrentDate();
      return;
    }
    // Add any additional logic for when the video ends, e.g., API call or analytics
  }

  moveNext() {
    this.currentIndex = this.currentIndex + 1;
    // this.videoUrl =
    //   this.praticeWithMasterDetail.shorts[this.currentIndex]?.shortUrl;
    this.gettingCurrentDate();
  }

  movePrev() {
    this.currentIndex = this.currentIndex - 1;
    // this.videoUrl =
    //   this.praticeWithMasterDetail.shorts[this.currentIndex - 1]?.shortUrl;
    this.gettingCurrentDate();
  }
}
