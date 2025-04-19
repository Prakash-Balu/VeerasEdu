import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  IRemoteAudioTrack,
} from 'agora-rtc-sdk-ng';
import { CommonService } from '../core/services/common.service';
import { SelfPracticeService } from '../core/services/self-practice.service';

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
  // private channelName: string = '';
  // private token: string = '';
  public channelName: string = 'Test';
  public token: any =
    '007eJxTYLDx/iT7SvxA2MmdssFV015MWsReLG6UnLTO/cTe/4JOkQ0KDIYGJsmmaeZmxgaJFibJlqmWqeaJBolmqYkplpbmqUmGm02ZMxoCGRkyCs4yMAIhCxCD+ExgkhlMskDJkNTiEgYGAEDZIPg=';

  public transcriptionResult: any;
  public isType2: any;
  public selfPracticeData: any;
  public practicesData: any;

  constructor(
    private commonService: CommonService,
    private selfPracticeService: SelfPracticeService
  ) {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    this.sentenceParts = this.rawTemplate.split('__');
    this.blanks = Array(this.sentenceParts.length - 1).fill('');
  }

  ngOnInit() {
    this.generateAgoraToken();
    this.getSelfPracticeData('67f3cf93b2e37bf52c1d8272');
  }

  generateAgoraToken() {
    this.commonService.generateAgoraToken().subscribe((resp) => {
      // this.token = resp?.token;
      // this.channelName = resp?.channelName;
      // this.token =
      //   '007eJxTYJhz82ZC39zeb8F8zztczf/HKD04ExcyO/Gj4HSTm1cTXOwVGAwNTJJN08zNjA0SLUySLVMtU80TDRLNUhNTLC3NU5MMmzy+pzcEMjJs2/+WiZEBAkF8dga/1HIF/7xUBgYASvsivg==';
      // this.channelName = 'New One';
      this.joinChannel();
    });
  }

  getSelfPracticeData(id: string) {
    this.selfPracticeService.getSelfPracticeById(id).subscribe((resp: any) => {
      this.isType2 = resp?.data?.displayType === 'type2' ? true : false;
      this.selfPracticeData = resp?.data;
      this.practicesData = resp?.data?.practices;
      if (this.isType2) {
        this.practicesData.map((e: any) => {
          const output = e.answer.replace(/\$.*?\$/g, '__');
          const outputAnswer = e.answer
            .match(/\$(.*?)\$/g)
            ?.map((str: any) => str.replace(/\$/g, ''));

          this.sentenceParts = output.split('__');
          this.blanks = Array(this.sentenceParts.length - 1).fill('');
          e.preview = e.answer;
          e.answer = output;
          e.blanks = this.blanks;
          e.blanksAnswer = outputAnswer;
          e.sentenceParts = this.sentenceParts;
          this.sentenceParts = [];
          this.blanks = [];
          return e;
        });
      }
      console.log(this.practicesData);
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

  speakDeafult(index: number, practiceIndex: any) {
    console.log(index, 'indexLSLDFLSD', practiceIndex);
    const text = 'Try in Hindi';
    const utterance = new SpeechSynthesisUtterance(text);
    console.log(utterance);
    utterance.lang = 'en-IN'; // or 'hi-IN' for Hindi accent
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
    this.startSpeech(index, practiceIndex);
  }

  startSpeech(index: number, practiceIndex: any) {
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
      console.log('recognitaion Event::', event);
      const lastResult = event.results[event.results.length - 1];
      if (lastResult.isFinal) {
        if (this.transcriptionResult !== undefined) {
          this.transcriptionResult += ' ' + lastResult[0].transcript;
        } else {
          this.transcriptionResult = lastResult[0].transcript;
        }
        this.transcriptionResult = this.transcriptionResult.trim();
        console.log('Transcriptin Result::', this.transcriptionResult);
        if (this.isType2) {
          const getCurrentData = this.practicesData.find(
            (e: any) => String(e._id) === String(practiceIndex._id)
          );
          console.log('getCurrentData::', getCurrentData);
          getCurrentData['blanks'][index] = this.transcriptionResult;
        } else {
          this.practicesData[index]['transAnswer'] = this.transcriptionResult;
          if (
            this.practicesData[index]['answer'] === this.transcriptionResult
          ) {
            this.practicesData[index]['isRight'] = true;
          } else {
            this.practicesData[index]['isRight'] = false;
            if (this.practicesData[index]['isRetry']) {
              this.practicesData[index]['isRetry'] += 1;
            } else {
              this.practicesData[index]['isRetry'] = 1;
            }
          }
        }
        this.transcriptionResult = '';
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech Recognition Error:', event.error);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended, restarting...');
    };
  }

  onInputChange(value: any, index: number) {
    console.log('value::', value);
    this.blanks[index] = value;
  }
}
