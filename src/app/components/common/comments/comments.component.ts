import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  SimpleChanges,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentsService } from '../../../core/services/comments.service';
import { AuthService } from '../../../core/services/auth.service';
import * as RecordRTC from 'recordrtc';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { environment } from '../../../../environments/environment';
import moment from 'moment';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  constructor(
    public commentsService: CommentsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    public snackbarService: MatSnackBar
  ) {}

  audioBaseUrl: string = environment.baseURL;

  userId = 2;
  senderId: string = '';
  commentId: any;
  replyId: any;
  segmentId: any;
  seqNo: any;
  commentsText: any;
  replyText: any;
  userType = 'ADMIN';
  userDetails: any;
  id: any;
  isEnableAudio: boolean = false;
  isEnableReplyAudio: boolean = false;
  record: any;
  recording: boolean = false;
  errorMessage: string | null = null;
  mediaRecorder: MediaRecorder | null = null;
  url: any;
  error: any;
  audioBlob: Blob | null = null;
  comments: any[] = [];
  dataResp: any[] = [];
  dataResp1: any[] = [];
  audioUrl: string | '' = '';
  @Input() segment: { _id?: string } = {};

  timer: string = '00:00';
  private timerInterval!: any;
  postTextFocussed = false;
  tooltipTitle: String = 'Speak';

  ngOnInit(): void {
    if (this.authService.tokenValue) {
      this.userDetails = this.authService.userMeApi();
      console.log(this.userDetails);
      this.userId = this.userDetails._id;
      this.userType = this.userDetails.role;

      this.route.paramMap.subscribe((params: ParamMap) => {
        // this.segmentId = params.get("id");
        this.segmentId = this.segment._id;
        // this.segmentId = 1;

        if (!!this.segmentId) {
          console.log(this.segmentId);
          this.viewComments();
        }
      });
    } else {
      this.demoComments();
    }
  }

  demoComments() {
    let respData = [
      {
        _id: '67488ba532e4a52d936dafe4',
        userId: '6650c5ce74c3379810be1f50',
        segmentId: '6735c99727a6da66983a3096',
        seqNo: 1,
        text: 'Hi this is test from changing the field',
        audioPath: '',
        createdAt: '2024-11-28T15:26:29.998Z',
        updatedAt: '2024-11-28T15:26:29.998Z',
        userName: 'Prakash',
        role: 'USER',
        reply: [],
      },
      {
        _id: '674d3de520c1c5b4a5131055',
        userId: '6650c5ce74c3379810be1f50',
        segmentId: '6735c99727a6da66983a3096',
        seqNo: 2,
        text: 'Hi this is test notification',
        audioPath: '',
        createdAt: '2024-12-02T04:56:05.753Z',
        updatedAt: '2024-12-02T04:56:05.753Z',
        userName: 'Prakash',
        role: 'USER',
        reply: [],
      },
      {
        _id: '6776ef8fa2bdee2c299604f0',
        userId: '6650c5ce74c3379810be1f50',
        segmentId: '6735c99727a6da66983a3096',
        seqNo: 3,
        text: 'This is audio chat app',
        audioPath:
          'https://veerasapi-production.up.railway.app/audios/6650c5ce74c3379810be1f50/hindi_edu_1735847821392.wav',
        createdAt: '2025-01-02T19:57:03.182Z',
        updatedAt: '2025-01-02T19:57:03.182Z',
        userName: 'Prakash',
        role: 'USER',
        reply: [],
      },
      {
        _id: '677a767c3c83591a2174d20f',
        userId: '66f2a756e0c0d600cf07a44b',
        segmentId: '6735c99727a6da66983a3096',
        seqNo: 2,
        text: '',
        audioPath:
          'http://localhost:3000/audios/66f2a756e0c0d600cf07a44b/hindi_edu_1736078972696.wav',
        createdAt: '2025-01-05T12:09:32.838Z',
        updatedAt: '2025-01-05T12:09:32.838Z',
        userName: 'prasanna flipflop',
        role: 'ADMIN',
        reply: [],
      },
      {
        _id: '677a99f7622f426fe91613eb',
        userId: '66f2a756e0c0d600cf07a44b',
        segmentId: '6735c99727a6da66983a3096',
        seqNo: 2,
        text: '',
        audioPath: '',
        createdAt: '2025-01-05T14:40:55.834Z',
        updatedAt: '2025-01-05T14:40:55.834Z',
        userName: 'prasanna flipflop',
        role: 'ADMIN',
        reply: [],
      },
      {
        _id: '677a9c14622f426fe916146e',
        userId: '66f2a756e0c0d600cf07a44b',
        segmentId: '6735c99727a6da66983a3096',
        seqNo: 2,
        text: '',
        audioPath: '',
        createdAt: '2025-01-05T14:49:56.329Z',
        updatedAt: '2025-01-05T14:49:56.329Z',
        userName: 'prasanna flipflop',
        role: 'ADMIN',
        reply: [],
      },
      {
        _id: '677a9cd9622f426fe9161492',
        userId: '66f2a756e0c0d600cf07a44b',
        segmentId: '6735c99727a6da66983a3096',
        seqNo: 2,
        text: '',
        audioPath: '',
        createdAt: '2025-01-05T14:53:13.385Z',
        updatedAt: '2025-01-05T14:53:13.385Z',
        userName: 'prasanna flipflop',
        role: 'ADMIN',
        reply: [],
      },
      {
        _id: '677aab190ce76a0256d62e07',
        userId: '6650c5ce74c3379810be1f50',
        segmentId: '6735c99727a6da66983a3096',
        seqNo: 2,
        text: '',
        audioPath:
          'http://localhost:3000/audios/6650c5ce74c3379810be1f50/hindi_edu_1736092441693.wav',
        createdAt: '2025-01-05T15:54:01.769Z',
        updatedAt: '2025-01-05T15:54:01.769Z',
        userName: 'Prakash',
        role: 'USER',
        reply: [],
      },
      {
        _id: '677aabc93c83591a2174d266',
        userId: '66f2a756e0c0d600cf07a44b',
        segmentId: '6735c99727a6da66983a3096',
        seqNo: 2,
        text: '',
        audioPath: '',
        createdAt: '2025-01-05T15:56:57.508Z',
        updatedAt: '2025-01-05T15:56:57.508Z',
        userName: 'prasanna flipflop',
        role: 'ADMIN',
        reply: [],
      },
      {
        _id: '677aabd93c83591a2174d27b',
        userId: '66f2a756e0c0d600cf07a44b',
        segmentId: '6735c99727a6da66983a3096',
        seqNo: 2,
        text: '',
        audioPath:
          'http://localhost:3000/audios/66f2a756e0c0d600cf07a44b/hindi_edu_1736092633451.wav',
        createdAt: '2025-01-05T15:57:13.523Z',
        updatedAt: '2025-01-05T15:57:13.523Z',
        userName: 'prasanna flipflop',
        role: 'ADMIN',
        reply: [],
      },
      {
        _id: '677aad113c83591a2174d291',
        userId: '66f2a756e0c0d600cf07a44b',
        segmentId: '6735c99727a6da66983a3096',
        seqNo: 2,
        text: '',
        audioPath:
          'http://localhost:3000/audios/66f2a756e0c0d600cf07a44b/hindi_edu_1736092945917.wav',
        createdAt: '2025-01-05T16:02:25.983Z',
        updatedAt: '2025-01-05T16:02:25.983Z',
        userName: 'prasanna flipflop',
        role: 'ADMIN',
        reply: [],
      },
    ];

    respData.forEach((value: any, index: any) => {
      this.dataResp1.push(value);
    });

    this.dataResp1 = this.getSortData(this.dataResp1);

    this.dataResp1.forEach((element, key) => {
      var fullName = element.userName;
      var userType = 'Learner';
      var usrAvatar = this.getUserAvatarName(fullName);
      if (element.role == 'ADMIN' || element.role == 'SUPERADMIN') {
        userType = 'ADMIN';
      }
      var replyData: any[] = [];
      var hiddenReplyData: any[] = [];
      if (element.reply && element.reply.length > 0) {
        element.reply.forEach((element1: any, key1: any) => {
          var fullName1 = element1.userName;
          var userType1 = 'Learner';
          var usrAvatar1 = this.getUserAvatarName(fullName1);
          if (element1.role == 'ADMIN' || element1.role == 'SUPERADMIN') {
            userType1 = 'ADMIN';
          }

          var obj1 = {
            fullName: fullName1,
            userType: userType1,
            usrAvatar: usrAvatar1,
            replyId: element1._id,
            userId: element1.user_id,
            seqNo: element1.seqNo,
            description: element1.text,
            dateAgoTxt: moment(element1.createdAt).fromNow(),
            audioPath: element1.audioPath === '' ? null : element1.audioPath,
          };

          if (replyData.length < 2) {
            replyData.push(obj1);
          } else {
            hiddenReplyData.push(obj1);
          }
        });
      }

      var obj = {
        fullName: fullName,
        userType: userType,
        usrAvatar: usrAvatar,
        commentId: element._id,
        userId: element.user_id,
        seqNo: element.seqNo,
        description: element.text || '',
        dateAgoTxt: moment(element.createdAt).fromNow(),
        audioPath: element.audioPath === '' ? null : element.audioPath,
        reply: replyData,
        hiddenReply: hiddenReplyData,
      };

      this.comments.push(obj);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.authService.tokenValue) {
      if (changes['segment']) {
        this.segmentId = this.segment._id;
        console.log('this.segmentId', this.segmentId);
        this.resetCommentInputs();
        if (!!this.segmentId) {
          console.log(this.segment);
          this.viewComments();
        }
      }
    } else {
      this.demoComments();
    }
  }

  ngAfterViewInit() {
    // this.getComments();
    // this.viewComments();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  enableAudioChat(type: 'NEW' | 'REPLY') {
    if (type === 'NEW') {
      this.isEnableAudio = !this.isEnableAudio;
      if (this.isEnableAudio) {
        this.requestMicrophoneAccess(type);
      } else {
        this.stopRecording();
      }
    } else {
      this.isEnableReplyAudio = !this.isEnableReplyAudio;
      if (this.isEnableReplyAudio) {
        this.requestMicrophoneAccess(type);
      } else {
        this.stopRecording();
      }
    }
  }

  private startTimer() {
    let seconds = 0;

    this.timerInterval = setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      this.timer = `${this.pad(mins)}:${this.pad(secs)}`;
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timer = '00:00';
  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  successCallback(stream: MediaStream) {
    var options = {
      mimeType: 'audio/wav' as const,
    };
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  async requestMicrophoneAccess(type: 'NEW' | 'REPLY') {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.startRecording(stream, type);
    } catch (error) {
      console.error('Microphone access denied:', error);
      this.showPermissionDeniedMessage(type);
    }
  }

  startRecording(stream: MediaStream, type: 'NEW' | 'REPLY') {
    this.mediaRecorder = new MediaRecorder(stream);
    this.url = null;
    this.startTimer();
    this.recording = true;
    this.tooltipTitle = 'Stop the recording';

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.processRecording(event.data, type);
      }
    };
    this.mediaRecorder.start();
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.recording = false;
      this.stopTimer();
      this.tooltipTitle = 'Speak';
    }
  }

  processRecording(blob: Blob, type: 'NEW' | 'REPLY') {
    try {
      this.audioBlob = blob;
      this.url = URL.createObjectURL(blob);
      this.errorMessage = null;
    } catch (error) {
      console.error('Error processing audio recording:', error);
      this.showPermissionDeniedMessage(type);
    }
  }

  showPermissionDeniedMessage(type: 'NEW' | 'REPLY') {
    this.errorMessage =
      'Permission denied. Please allow access to the microphone.';
    setTimeout(() => {
      if (type === 'NEW') {
        this.isEnableAudio = !this.isEnableAudio;
      } else if (type === 'REPLY') {
        this.isEnableReplyAudio = !this.isEnableReplyAudio;
      }
      this.stopRecording();
      this.errorMessage = null;
    }, 5000);
  }

  deleteRecording(type: 'NEW' | 'REPLY') {
    if (type === 'NEW') {
      this.url = null;
      this.audioBlob = null;
      this.isEnableAudio = false;
    } else if (type === 'REPLY') {
      this.url = null;
      this.audioBlob = null;
      this.isEnableReplyAudio = false;
    }
  }

  uploadAudio(blob: Blob, type: 'NEW' | 'REPLY'): void {
    const file = new File([blob], 'audio.wav', { type: 'audio/wav' });

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds the 10MB limit.');
      return;
    }
    if (type === 'NEW') {
      this.isEnableAudio = !this.isEnableAudio;

      this.commentsService.uploadAudio(file).subscribe(
        (response: any) => {
          if (response.meta.code === 200) {
            const audioPath = response?.data;
            this.audioUrl = `${this.audioBaseUrl}${audioPath}`;

            this.addCommentApi();
          }
        },
        (error) => {
          console.log('error::', error);
          this.recording = false;
          this.url = null;
          this.audioBlob = null;
          alert('Failed to upload audio. Please try again or contact support.');
        }
      );
    } else if (type === 'REPLY') {
      this.isEnableReplyAudio = !this.isEnableReplyAudio;

      this.commentsService.uploadAudio(file).subscribe(
        (response: any) => {
          if (response.meta.code === 200) {
            const audioPath = response?.data;
            this.audioUrl = `${this.audioBaseUrl}${audioPath}`;
          }
        },
        (error) => {
          console.log('error::', error);
          this.recording = false;
          this.url = null;
          this.audioBlob = null;
          alert('Failed to upload audio. Please try again or contact support.');
        }
      );
    }
  }

  errorCallback(error: any) {
    console.error('Cannot play audio in your browser', error);
  }

  toggleReply(event: MouseEvent): void {
    const button = event.target as HTMLElement;
    const closestItem = button.closest('.comment__item');

    if (closestItem) {
      const closestReply = closestItem.querySelector('.comment__reply');

      if (closestReply) {
        closestReply.classList.toggle('active');
      } else {
        console.error(
          '.comment__reply not found within closest .comment__item'
        );
      }
    } else {
      console.error('.comment__item not found for the clicked button');
    }
  }

  closeReply(event: MouseEvent): void {
    const button = event.target as HTMLElement;
    const closestItem = button.closest('.comment__item');

    if (closestItem) {
      const closestReply = closestItem.querySelector('.comment__reply');

      if (closestReply) {
        closestReply.classList.remove('active');
        this.replyText = '';
        this.recording = false;
        this.isEnableReplyAudio = false;
        this.url = null;
        this.stopRecording();
      } else {
        console.error(
          '.comment__reply not found within closest .comment__item'
        );
      }
    } else {
      console.error('.comment__item not found for the clicked button');
    }
  }

  moreReply(event: MouseEvent): void {
    const button = event.target as HTMLElement;
    const closestItem = button.closest('.comment__container');
    const closestResponse = button.closest('.comment__hidden_response');
    if (closestResponse) {
      closestResponse.classList.add('hide');
    }
    if (closestItem) {
      const closestReplies = closestItem.querySelectorAll(
        '.comment__item_hidden'
      );

      if (closestReplies.length > 0) {
        closestReplies.forEach((reply) => {
          reply.classList.toggle('show');
        });
      } else {
        console.error(
          '.comment__item_hidden not found within closest .comment__container'
        );
      }
    } else {
      console.error('.comment__container not found for the clicked button');
    }
  }

  getUserAvatarName(name: any) {
    return name?.charAt(0).toUpperCase();
  }

  getSortData(data: any) {
    return data.sort((a: any, b: any) => {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
  }

  resetCommentInputs() {
    this.commentsText = '';
    this.audioUrl = '';
    this.audioBlob = null;
    this.url = null;
    this.isEnableAudio = false;
    this.isEnableReplyAudio = false;
  }

  addComment() {
    if (this.recording) {
      alert('Please wait for the audio recording to finish.');
      return;
    }

    if (!!this.audioBlob) {
      this.uploadAudio(this.audioBlob, 'NEW');
    } else {
      this.addCommentApi();
    }
  }

  addCommentApi() {
    console.log('add');
    const seqNo = this.comments.length
      ? parseInt(this.comments[this.comments.length - 1].seqNo) + 1
      : 1;

    const commentsData = {
      segmentId: this.segmentId,
      seqNo: seqNo,
      text: this.commentsText || '',
      audioPath: this.audioUrl || '',
    };

    this.commentsService
      .addComments(commentsData)
      .subscribe((respData: any) => {
        if (respData.meta.code === 200) {
          this.resetCommentInputs();
          this.viewComments();
          // this.snackbarService.Success('Comment Posted Successfully');
          this.snackbarService.open('Comment Posted Successfully', 'Close', {
            duration: 1000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar'],
          });
        }
      });
  }

  viewComments() {
    this.commentsService
      .viewComments(this.segmentId)
      .subscribe((respData: any) => {
        this.dataResp1 = [];
        this.comments = [];
        respData.data.forEach((value: any, index: any) => {
          this.dataResp1.push(value);
        });

        this.dataResp1 = this.getSortData(this.dataResp1);

        this.dataResp1.forEach((element, key) => {
          var fullName = element.userName;
          var userType = 'Learner';
          var usrAvatar = this.getUserAvatarName(fullName);
          if (element.role == 'ADMIN' || element.role == 'SUPERADMIN') {
            userType = 'ADMIN';
          }
          var replyData: any[] = [];
          var hiddenReplyData: any[] = [];
          if (element.reply && element.reply.length > 0) {
            element.reply.forEach((element1: any, key1: any) => {
              var fullName1 = element1.userName;
              var userType1 = 'Learner';
              var usrAvatar1 = this.getUserAvatarName(fullName1);
              if (element1.role == 'ADMIN' || element1.role == 'SUPERADMIN') {
                userType1 = 'ADMIN';
              }

              var obj1 = {
                fullName: fullName1,
                userType: userType1,
                usrAvatar: usrAvatar1,
                replyId: element1._id,
                userId: element1.user_id,
                seqNo: element1.seqNo,
                description: element1.text,
                dateAgoTxt: moment(element1.createdAt).fromNow(),
                audioPath:
                  element1.audioPath === '' ? null : element1.audioPath,
              };

              if (replyData.length < 2) {
                replyData.push(obj1);
              } else {
                hiddenReplyData.push(obj1);
              }
            });
          }

          var obj = {
            fullName: fullName,
            userType: userType,
            usrAvatar: usrAvatar,
            commentId: element._id,
            userId: element.user_id,
            seqNo: element.seqNo,
            description: element.text || '',
            dateAgoTxt: moment(element.createdAt).fromNow(),
            audioPath: element.audioPath === '' ? null : element.audioPath,
            reply: replyData,
            hiddenReply: hiddenReplyData,
          };

          this.comments.push(obj);
        });

        console.log(this.comments);
      });
  }

  calculateSequenceNumber(comment: any): number {
    if (comment.reply.length === 0) {
      return 1;
    } else if (comment.reply.length <= 2 && comment.hiddenReply.length === 0) {
      return parseInt(comment.reply[comment.reply.length - 1].seqNo) + 1;
    } else {
      return (
        parseInt(comment.hiddenReply[comment.hiddenReply.length - 1].seqNo) + 1
      );
    }
  }

  async submitReply(comment: any, event: MouseEvent) {
    this.seqNo = await this.calculateSequenceNumber(comment);

    const replyData = {
      commentId: comment.commentId,
      userId: this.userId,
      segmentId: this.segmentId,
      seqNo: this.seqNo,
      text: this.replyText,
      audioPath: '',
    };

    try {
      if (this.audioBlob && this.isEnableReplyAudio) {
        await this.uploadAudio(this.audioBlob, 'REPLY');
        replyData.audioPath = this.audioUrl;
      }

      this.commentsService.addComments(replyData).subscribe((respData: any) => {
        console.log(respData);
        if (respData.meta.code === 200) {
          this.closeReply(event);
          this.viewComments();
        } else {
          alert('Failed to submit reply. Please try again.');
        }
      });
    } catch (error) {
      console.error('Failed to submit reply:', error);
      alert('An error occurred while submitting your reply. Please try again.');
    }
  }

  isPlaying = false;

  togglePlay() {
    this.isPlaying = !this.isPlaying;
  }
}
