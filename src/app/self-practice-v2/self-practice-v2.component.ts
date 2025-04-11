import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  IRemoteAudioTrack,
} from 'agora-rtc-sdk-ng';
import { CommonService } from '../core/services/common.service';

@Component({
  selector: 'app-self-practice-v2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './self-practice-v2.component.html',
  styleUrl: './self-practice-v2.component.css',
})
export class SelfPracticeV2Component {
  public rawTemplate = '__ name is __ and I live in __'; // ← You can make this dynamic
  public sentenceParts: string[] = [];
  public blanks: string[] = [];
  public recognition: any;

  private client: IAgoraRTCClient;
  private localAudioTrack: ILocalAudioTrack | null = null;
  private uid: string = Math.floor(Math.random() * 10000).toString();
  private appId: string = '104c5f7630a84c9e9e7a0a6ead997eb1';
  private channelName: string = '';
  private token: string = '';
  // channelName: string = 'New Channael';
  // token: any =
  //   '007eJxTYCh/b+qruvL6O5FnPB+yfpdFmzEU5xSmnIlW1b6jpXBjb4gCg6GBSbJpmrmZsUGihUmyZaplqnmiQaJZamKKpaV5apKh0v+v6Q2BjAwJds9YGRkgEMTnYfBLLVdwzkjMy0tMzWFgAABM0iJv';

  public transcriptionResult: any;

  constructor(private commonService: CommonService) {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    // Prepare the structure: split by "__"
    this.sentenceParts = this.rawTemplate.split('__');
    console.log('sentenceParts', this.sentenceParts);
    this.blanks = Array(this.sentenceParts.length - 1).fill('');
    console.log('blanks', this.blanks);

    // Init speech recognition
    // const SpeechRecognition =
    //   (window as any).SpeechRecognition ||
    //   (window as any).webkitSpeechRecognition;
    // this.recognition = new SpeechRecognition();
    // this.recognition.lang = 'en-IN';
    // this.recognition.interimResults = false;
    // this.recognition.maxAlternatives = 1;
  }

  ngOnInit() {
    this.generateAgoraToken();
  }

  generateAgoraToken() {
    this.commonService.generateAgoraToken().subscribe((resp) => {
      this.token = resp?.token;
      this.channelName = resp?.channelName;
      this.token =
        '007eJxTYJhz82ZC39zeb8F8zztczf/HKD04ExcyO/Gj4HSTm1cTXOwVGAwNTJJN08zNjA0SLUySLVMtU80TDRLNUhNTLC3NU5MMmzy+pzcEMjJs2/+WiZEBAkF8dga/1HIF/7xUBgYASvsivg==';
      this.channelName = 'New One';
      this.joinChannel();
    });
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

      // this.initializeSpeechRecognition();
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

  startSpeech(index: number) {
    console.log('indexStartSe::', index);

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
    if (index || index == 0) {
      recognition.start();
    }
    recognition.onresult = (event: any) => {
      const lastResult = event.results[event.results.length - 1];
      console.log('lastResult::', lastResult);
      if (lastResult.isFinal) {
        if (this.transcriptionResult !== undefined) {
          this.transcriptionResult += ' ' + lastResult[0].transcript;
        } else {
          this.transcriptionResult = lastResult[0].transcript;
        }
        this.transcriptionResult = this.transcriptionResult.trim();
        this.blanks[index] = this.transcriptionResult;
        this.transcriptionResult = '';
        // recognition.start(); // Restart on end to maintain real-time transcription
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech Recognition Error:', event.error);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended, restarting...');
    };
  }
}
