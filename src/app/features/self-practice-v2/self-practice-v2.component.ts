import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  IRemoteAudioTrack,
} from 'agora-rtc-sdk-ng';
import { CommonService } from '../../shared/services/common.service';
import { SelfPracticeService } from '../../shared/services/self-practice.service';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'app-self-practice-v2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './self-practice-v2.component.html',
  styleUrl: './self-practice-v2.component.css',
})
export class SelfPracticeV2Component {
  public recognition: any;

  private client: IAgoraRTCClient;
  private localAudioTrack: ILocalAudioTrack | null = null;
  private uid: string = Math.floor(Math.random() * 10000).toString();
  private appId: string = '104c5f7630a84c9e9e7a0a6ead997eb1';
  // private channelName: string = '';
  // private token: string = '';
  public channelName: string = 'Test';
  public token: any =
    '007eJxTYDj5iXeLSbnD6/dFD2Jee1/dd+fUi+4/a9o+MCzq+Lx+4Z84BQZDA5Nk0zRzM2ODRAuTZMtUy1TzRINEs9TEFEtL89QkQyNj9oyGQEaGKU/cGRiBkAWIQXwmMMkMJlmgZEhqcQkDAwBiaiZR';

  public transcriptionResult: any;
  public displayType: any;
  public selfPracticeData: any;
  public practicesData: any;
  public isListening: boolean = false;
  dots = Array(3); // creates 3 dots

  constructor(
    private commonService: CommonService,
    private selfPracticeService: SelfPracticeService,
    private utilsService: UtilsService
  ) {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  }

  ngOnInit() {
    this.generateAgoraToken();
    this.getSelfPracticeData('680601948f16872cf57b3e1d');
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
      this.displayType = resp?.data?.displayType;
      this.selfPracticeData = resp?.data;
      this.practicesData = resp?.data?.practices;

      if (this.displayType === 'type2') {
        this.practicesData.map((e: any) => {
          const output = e.answer.replace(/\$.*?\$/g, '__');
          console.log('output::', output);

          const outputAnswer = e.answer
            .match(/\$(.*?)\$/g)
            ?.map((str: any) => str.replace(/\$/g, ''));
          console.log('outputAnswer::', outputAnswer);
          e.preview = e.answer;
          e.answer = output;
          e.sentenceParts = output.split('__');
          console.log('sentenceParts::', e.sentenceParts);
          e.blanks = Array(e.sentenceParts.length - 1).fill('');
          console.log('blanks::', e.blanks);
          e.blanksAnswer = outputAnswer;
          e.loadingStates = new Array(e.blanks.length).fill(false);
          return e;
        });
      } else {
        this.practicesData.map((e: any) => {
          e.loadingState = false;
          return e;
        });
      }
      console.log('this.practicesData::', this.practicesData);
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
      recognition.stop(); // Restart on end to maintain real-time transcription
    };

    recognition.onend = () => {
      console.log('Speech recognition ended, restarting...');
      recognition.stop(); // Restart on end to maintain real-time transcription
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
    utterance.lang = 'en-IN'; // or 'hi-IN' for Hindi accent
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
    this.isListening = true;
    if (this.displayType === 'type2') {
    } else {
      this.practicesData[index]['loadingState'] = true;
    }
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
      console.log('onResult::', event);
      const lastResult = event.results[event.results.length - 1];
      console.log('lastResult::', lastResult);
      if (lastResult.isFinal) {
        if (this.transcriptionResult !== undefined) {
          this.transcriptionResult += ' ' + lastResult[0].transcript;
        } else {
          this.transcriptionResult = lastResult[0].transcript;
        }
        this.transcriptionResult = this.transcriptionResult.trim();
        console.log('this.displayType::', this.displayType);
        if (this.displayType === 'type2') {
          const getCurrentData = this.practicesData.find(
            (e: any) => String(e._id) === String(practiceIndex._id)
          );
          console.log('getCurrentData::', getCurrentData);
          getCurrentData['blanks'][index] = this.transcriptionResult;
        } else {
          this.practicesData[index]['transAnswer'] = this.transcriptionResult;
          const matchPercentage = this.utilsService.getSimilarity(
            this.practicesData[index]['answer'],
            this.transcriptionResult
          );
          if (matchPercentage >= 80) {
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
        this.practicesData[index]['loadingState'] = false;
        recognition.stop();
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech Recognition Error:', event.error);
      recognition.stop();
    };

    recognition.onend = (event: any) => {
      console.log('Speech recognition ended, restarting...', event);
      recognition.stop();
    };
  }
}
