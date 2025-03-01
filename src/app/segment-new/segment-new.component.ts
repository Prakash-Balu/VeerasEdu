import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowCircleLeft,
  faCircleArrowLeft,
  faBell,
  faArrowLeft,
  faMicrophone,
  faTimes,
  faBars,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { SegmentService } from '../core/services/segments.service';
import { VideoPlayerComponent } from '../components/video-player/video-player.component';
import { MaterialModule } from '../material-module';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ments',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    RouterLink,
    VideoPlayerComponent,
    MaterialModule,
    SidebarComponent
  ],
  templateUrl: './segment-new.component.html',
  styleUrls: ['./segment-new.component.css'],
})
export class SegmentNewComponent {
  faArrowCircleLeft = faArrowCircleLeft;
  faCircleArrowLeft = faCircleArrowLeft;
  faArrowLeft = faArrowLeft;
  faMicrophone = faMicrophone;
  faBell = faBell;
  faTimes = faTimes;
  faBars = faBars;
  faVideo = faVideo;

  isSidebarVisible: boolean = true;
  videoObj: any = {};
  segmentlist: any[] = [
    {
        "_id": "6735c99727a6da66983a3096",
        "name": "SEGMENT-1",
        "description": "SEGMENT-1",
        "video_url": "https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
        "pageName": "classroom",
        "routeUrl": "class-room",
        "createdAt": "2024-11-14T09:57:43.692Z",
        "updatedAt": "2024-11-14T09:57:43.692Z",
        "__v": 0
    },
    {
        "_id": "6735c9b927a6da66983a309b",
        "name": "SEGMENT-2",
        "description": "SEGMENT-2",
        "video_url": "https://player.vimeo.com/video/1019160112?title=0&amp;byline=0&amp;portrait=0&amp;dnt=1&amp;transparent=0&amp;app_id=122963",
        "pageName": "classroom",
        "routeUrl": "class-room",
        "createdAt": "2024-11-14T09:58:17.169Z",
        "updatedAt": "2024-11-14T09:58:17.169Z",
        "__v": 0
    },
    {
        "_id": "6735ca0127a6da66983a30a6",
        "name": "SEGMENT-3",
        "description": "SEGMENT-3",
        "video_url": "https://player.vimeo.com/video/1019160112?title=0&amp;byline=0&amp;portrait=0&amp;dnt=1&amp;transparent=0&amp;app_id=122963",
        "pageName": "classroom",
        "routeUrl": "class-room",
        "createdAt": "2024-11-14T09:59:29.908Z",
        "updatedAt": "2024-11-14T09:59:29.908Z",
        "__v": 0
    },
    {
        "_id": "6735ca1327a6da66983a30ab",
        "name": "SEGMENT-4",
        "description": "SEGMENT-4",
        "video_url": "https://player.vimeo.com/video/1019160112?title=0&amp;byline=0&amp;portrait=0&amp;dnt=1&amp;transparent=0&amp;app_id=122963",
        "pageName": "classroom",
        "routeUrl": "class-room",
        "createdAt": "2024-11-14T09:59:47.940Z",
        "updatedAt": "2024-11-14T09:59:47.940Z",
        "__v": 0
    },
    {
        "_id": "6735ca2327a6da66983a30b0",
        "name": "SEGMENT-5",
        "description": "SEGMENT-5",
        "video_url": "https://player.vimeo.com/video/1019160112?title=0&amp;byline=0&amp;portrait=0&amp;dnt=1&amp;transparent=0&amp;app_id=122963",
        "pageName": "classroom",
        "routeUrl": "class-room",
        "createdAt": "2024-11-14T10:00:03.847Z",
        "updatedAt": "2024-11-14T10:00:03.847Z",
        "__v": 0
    }
];
  notifications: any[] = [];
  asked: any[] = [];
  answered: any[] = [];
  selectedSegment: any;
  segmentId: string = '';
  currentUrl: string = '';
  activeSegmentId: string | null = null;
  page!: string;

  constructor(
    public segmentservice: SegmentService,
    private route: Router,
    private actRoute: ActivatedRoute,

    private domSanitizer: DomSanitizer
  ) {}

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  ngOnInit() {
    document.documentElement.style.overflowY = 'hidden';
    this.currentUrl = this.route.url;
    const routeData = this.actRoute.snapshot.data;
    this.page =
      routeData['page'].charAt(0).toUpperCase() +
      routeData['page'].slice(1).toLowerCase();

    // this.fetchSegments();
    // this.viewNotification();
    this.segmentId = this.segmentlist[0]._id; //for dummy data
    this.onSegmentClick(this.segmentId);
  }
  ngOnDestroy() {
    document.documentElement.style.overflowY = 'auto';
  }

  fetchSegments() {
    this.segmentservice.getSegmentList().subscribe(
      (response: any) => {
        if (response.meta.code === 200) {
          this.segmentlist = this.sortData(response.data);
          if (this.segmentlist.length > 1) {
            this.segmentId = this.segmentlist[0]._id;
            this.onSegmentClick(this.segmentId);
          }
        }
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  viewNotification() {
    this.segmentservice.viewNotification().subscribe(
      (response: any) => {
        if (response.meta.code === 200) {
          this.notifications = response.data;
          this.asked = response.data.askedQuestions;
          this.answered = response.data.answeredQuestions;
        }
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  sortData(respData: any) {
    return respData.sort((a: any, b: any) => {
      return <any>new Date(a.createdAt) - <any>new Date(b.createdAt);
    });
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  onSegmentClick(segmentId: string) {
    this.activeSegmentId = segmentId;
    const foundSegment = this.segmentlist.find(
      (segment) => segment._id === segmentId
    );

    if (foundSegment) {
      this.videoObj = foundSegment;
      this.selectedSegment = foundSegment;
      console.log('foundedone::', this.selectedSegment);
    } else {
      console.error('Segment not found');
    }
  }
}
