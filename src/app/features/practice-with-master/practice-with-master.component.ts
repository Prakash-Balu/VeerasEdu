import { CommonModule } from '@angular/common';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../../material-module';
import AgoraRTC, {
  ClientRole,
  IAgoraRTCClient,
  ILocalAudioTrack,
} from 'agora-rtc-sdk-ng';
import { PraticeWithMasterService } from '../../shared/services/pratice-with-master.service';
import { SwarmifyPlayerComponent } from './swarmify-player/swarmify-player.component';
import { WistiaPlayerComponent } from './wistia-player/wistia-player.component';
import { UtilsService } from '../../shared/services/utils.service';

// import * as protoRoot from "../core/proto/SttMessage_es6"
// import * as protoRoot from "../core/SttMessage"

@Component({
  selector: 'app-practice-with-master',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    MaterialModule,
    SwarmifyPlayerComponent,
    WistiaPlayerComponent,
  ],
  templateUrl: './practice-with-master.component.html',
  styleUrls: ['./practice-with-master.component.css'],
})
export class PracticeWithMasterComponent implements OnInit {
  public videoObj: any;
  public videoId: any;

  public mainVideo: boolean = false;

  public currentIndex: number = 0;
  public currentData: any;

  // private client: any;
  private client: IAgoraRTCClient;
  private localAudioTrack: ILocalAudioTrack | null = null;

  public appId: string = '104c5f7630a84c9e9e7a0a6ead997eb1';
  public channelName: string = 'Test';
  public token: any =
    '007eJxTYBDR57TV535dZ7+z6qtxRcp8rSl/KgJ3ts11bZta/b3+X4MCg6GBSbJpmrmZsUGihUmyZaplqnmiQaJZamKKpaV5apKhshhXRkMgI8OhWTlMjAyMDCxADOIzgUlmMMkCJUNSi0sYGAArxyDs';
  public uid: string = Math.floor(Math.random() * 10000).toString();

  public praticeWithMasterDetail: any;
  public answer: string = '';
  public answerConverted: any;
  public matchedIndices: any = [];
  public question: string = '';

  public isListening: boolean = false;
  public dots = Array(3); // creates 3 dots

  private role: ClientRole = 'audience'; // or 'host', depending on your use case
  private pusherBotUid: string = 'YOUR_PUSHER_BOT_UID'; // Replace with your bot UID

  constructor(
    private praticeWithMasterService: PraticeWithMasterService,
    private utilsService: UtilsService
  ) {
    this.client = AgoraRTC.createClient({
      mode: 'live',
      codec: 'vp8',
      role: this.role,
    });
    this.client.on('stream-message', this.onStreamMessage.bind(this));
  }

  ngOnInit(): void {
    this.getPraticeWithMasterDetails('68076897506de912424ea49d');
    // this.joinChannel();
    this.initialize();
  }

  async initialize() {
    // Initialize the client and join a channel
    // Replace 'YOUR_APP_ID' and 'YOUR_CHANNEL_NAME' with your actual values
    const appId = '104c5f7630a84c9e9e7a0a6ead997eb1';
    const channel = 'Test';
    const token = this.token; // Use a token if required

    await this.client.join(appId, channel, token, null);
  }

  private onStreamMessage(uid: string, stream: any) {
    // Check if the remote user ID is the specified streaming bot ID; if not, return directly
    // if (uid !== this.pusherBotUid) {
    //   return;
    // }

    // Assuming 'data' is the message received from the stream
    const data = stream; // Adjust this based on how you receive the data
    // const textstream = protoRoot.Agora.SpeechToText.lookup('Text').decode(data);

    // Process the decoded message
    // console.log('textstream::', textstream);
  }

  playBellSound() {
    const audio = new Audio('assets/sounds/bell.mp3');
    audio.load();
    audio.play().catch((err) => console.warn('🔕 Bell sound failed:', err));
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
              if (!ele.watched) {
                this.gettingCurrentData();
                return;
              }
            }
          } else {
            this.mainVideo = true;
            this.videoObj = {
              videoId: this.praticeWithMasterDetail.videoUrl,
              mainVideo: true,
            };
          }
        }
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
      await this.client.setClientRole('host'); // 🔸 Add this line

      this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await this.client.publish([this.localAudioTrack]);
      this.subscribeToRemoteAudio();
    } catch (error) {
      console.error('Failed to join channel:', error);
    }
  }

  initializeSpeechRecognition() {
    const SpeechRecognition =
      // (window as any).SpeechRecognition ||
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
      console.log('event::', event);
      const lastResult = event.results[event.results.length - 1];
      console.log('lastResult[0].transcript::', lastResult[0].transcript);
      this.compareTranscript(lastResult[0].transcript);
      if (lastResult.isFinal) {
        const transcriptionResult = lastResult[0].transcript.trim();
        console.log('transRegu::', transcriptionResult);
        this.checkAnswer(transcriptionResult);
        recognition.stop();
        this.matchedIndices = [];
      }
    };

    recognition.pause = (event: any) => {
      console.log('Speech Recognition Error:', event.error);
    };

    recognition.pause = (event: any) => {
      console.log('Speech Recognition Error:', event.error);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech Recognition Error:', event.error);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended, restarting...');
    };

    recognition.start();
  }

  subscribeToRemoteAudio() {
    // this.client.on(
    //   'user-published',
    //   async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
    //     await this.client.subscribe(user, mediaType);
    //     console.log('Subscribed to remote user:', user.uid);

    //     if (mediaType === 'audio') {
    //       const remoteAudioTrack = user.audioTrack as IRemoteAudioTrack;
    //       console.log('remoteAudioTrack::', remoteAudioTrack);
    //       remoteAudioTrack.play();
    //     }
    //   }
    // );

    this.client.on('stream-message', (uid, data) => {
      console.log(uid, data);
      // Replace `123456` with your bot UID
      if (uid !== '123456') return;

      // const decoded = protoRoot.Agora.SpeechToText.Text.decode(data);
      // console.log('Decoded Transcription:', decoded);
      // Emit decoded.text or pass to UI
    });
  }

  compareTranscript(transcript: string) {
    const spokenWords = transcript.split(' ');
    this.matchedIndices = [];
    this.answerConverted = this.answer.split(' ');
    this.answerConverted.forEach((word: any, index: any) => {
      if (spokenWords.includes(word)) {
        this.matchedIndices.push(index);
      }
    });
  }

  checkAnswer(transResult: string) {
    const matchPercentage = this.utilsService.getSimilarity(
      this.answer,
      transResult
    );
    if (matchPercentage >= 80) {
      this.currentData['isRight'] = true;
    } else {
      this.currentData['isRight'] = false;
      if (this.currentData['isRetry']) {
        this.currentData['isRetry'] += 1;
      } else {
        this.currentData['isRetry'] = 1;
      }
    }
  }

  gettingCurrentData() {
    this.currentData = this.praticeWithMasterDetail.shorts[this.currentIndex];
    this.videoObj = {
      ...this.currentData,
      videoId: this.currentData.shortUrl,
    };
  }

  videoEndEvent(event: any) {
    if (this.mainVideo === true) {
      this.currentIndex = 0;
      this.gettingCurrentData();
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
    this.answerConverted = event.split(' ');
    this.playBellSound();
    this.initializeSpeechRecognition();
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
