import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowCircleLeft,
  faCircleArrowLeft,
  faBell,
  faArrowLeft,
  faMicrophone,
  faTimes,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import Player from '@vimeo/player';
import { CommentsComponent } from './comments/comments.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonService } from '../../core/services/common.service';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    VideoPlayerComponent,
    CommentsComponent,
    RouterModule,
  ],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css',
})
export class ClassroomComponent {
  videoObj: any = {};
  //  @Input() videoObj: { videoUrl?: string, _id?: string } = {};
  selectedSubject: any;

  constructor(
    private actRoute: ActivatedRoute,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.commonService.selectedSubject$.subscribe((subject: any) => {
      this.selectedSubject = subject;
      console.log('Classroom received subject:', subject);

      this.videoObj = subject; // Assign videoObj from the subject if available
    });
  }
}
