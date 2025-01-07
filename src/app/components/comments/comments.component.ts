import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Comment } from '../../state/comments.model';
import * as CommentsActions from '../../state/comments.actions';
import * as fromComments from '../../state/comments.selectors';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import * as RecordRTC from 'recordrtc';
import { CommentsService } from '../../core/services/comments.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SnackbarService } from '../../core/services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() segment: { _id?: string } = {};
  comments$!: Observable<Comment[]>;
  error$!: Observable<any>;

  commentsText: string = '';
  audioBlob: Blob | null = null;
  timerInterval!: any;
  audioBaseUrl: string = environment.baseURL;
  isEnableAudio: boolean = false;
  audioUrl: string | '' = '';
  url: any;
  recording: boolean = false;
  record: any;
  timer: string = '00:00';
  replyText: any;
  seqNo: any;
  userDetails: any;
  userId: any;
  userType: any;

  constructor(
    private store: Store,
    private domSanitizer: DomSanitizer,
    public commentsService: CommentsService,
    public snackbarService: MatSnackBar,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.authService.userMeApi();
    console.log(this.userDetails);
    this.userId = this.userDetails._id;
    this.userType = this.userDetails.role;
    if (this.segment._id) {
      this.viewComments(this.segment);
    }

    this.comments$ = this.store.select(fromComments.selectComments);
    this.error$ = this.store.select(fromComments.selectError);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['segment']) {
      this.resetCommentInputs();
      if (!!this.segment._id) {
        console.log(this.segment);
        this.viewComments(this.segment);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  enableAudioChat() {
    this.isEnableAudio = !this.isEnableAudio;
  }

  resetCommentInputs() {
    this.commentsText = '';
    this.audioUrl = '';
    this.audioBlob = null;
    this.url = null;
    this.isEnableAudio = false;
  }

  startRecording() {
    this.url = null;
    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true,
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream: MediaStream) {
    var options = {
      mimeType: 'audio/wav' as const,
    };
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
    this.startTimer();
  }

  errorCallback(error: any) {
    console.error('Cannot play audio in your browser', error);
  }

  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
    this.stopTimer();
  }

  processRecording(blob: Blob) {
    this.audioBlob = blob;
    this.url = URL.createObjectURL(blob);
    // this.uploadAudio(blob);
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

  uploadAudio(blob: Blob) {
    const file = new File([blob], 'audio.wav', { type: 'audio/wav' });

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds the 10MB limit.');
      return;
    }

    this.commentsService.uploadAudio(file).subscribe(
      (response: any) => {
        if (response.meta.code === 200) {
          const audioPath = response?.data;
          this.audioUrl = `${this.audioBaseUrl}${audioPath}`;
          // const payload = {
          //   segmentId: this.segmentId,
          //   seqNo: this.seqNo,
          //   text: '',
          //   audioPath: this.audioUrl,
          // };
          // this.commentsService
          //   .addComments(payload)
          //   .subscribe((respData: any) => {
          //     if (respData.meta.code === 200) {
          //       this.resetCommentInputs();
          //       this.viewComments();
          //     }
          //   });

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
  }

  addComment() {
    console.log('insideadd');
    if (!!this.audioBlob) {
      this.uploadAudio(this.audioBlob);
    } else {
      this.addCommentApi();
    }
  }

  comments: any[] = [];
  addCommentApi() {
    console.log('inside');
    const seqNo = this.comments.length
      ? parseInt(this.comments[this.comments.length - 1].seqNo) + 1
      : 1;

    const commentsData = {
      segmentId: this.segment._id,
      seqNo: seqNo,
      text: this.commentsText || '',
      audioPath: this.audioUrl || '',
    };

    this.commentsService
      .addComments(commentsData)
      .subscribe((respData: any) => {
        if (respData.meta.code === 200) {
          this.resetCommentInputs();
          this.viewComments(this.segment);
          this.snackbarService.open('Comment Posted Successfully', 'Close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
        }
      });
  }

  viewComments(segment: any) {
    this.store.dispatch(
      CommentsActions.loadComments({ segmentId: segment._id })
    );
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

  submitReply(comment: any, event: MouseEvent) {
    console.log(comment);
    if (comment.reply.length == 0) {
      this.seqNo = 1;
    } else {
      if (comment.reply.length <= 2 && comment.hiddenReply.length == 0) {
        this.seqNo =
          parseInt(comment.reply[comment.reply.length - 1].seqNo) + 1;
      } else {
        this.seqNo =
          parseInt(comment.hiddenReply[comment.hiddenReply.length - 1].seqNo) +
          1;
      }
    }
    const replyData = {
      commentId: comment.commentId,
      segmentId: this.segment._id,
      seqNo: this.seqNo,
      text: this.replyText,
      audioPath: '',
    };

    this.commentsService.addComments(replyData).subscribe((respData: any) => {
      console.log(respData);

      if (respData.meta.code == 200) {
        this.closeReply(event);
        this.viewComments(this.segment);
      }
    });
  }

  closeReply(event: MouseEvent): void {
    const button = event.target as HTMLElement;
    const closestItem = button.closest('.comment__item');

    if (closestItem) {
      const closestReply = closestItem.querySelector('.comment__reply');

      if (closestReply) {
        closestReply.classList.remove('active');
        this.replyText = '';
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
}
