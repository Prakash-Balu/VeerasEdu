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


@Component({
  selector: 'app-speaking-room',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterLink, VideoPlayerComponent, MaterialModule],
  templateUrl: './speaking-room.component.html',
  styleUrl: './speaking-room.component.css'
})
export class SpeakingRoomComponent {
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
  segmentlist: any[] = [];
  selectedSegment: any;
  segmentId: string = '';
  currentUrl: string = '';
  activeSegmentId: string | null = null;
  page!: string;

  constructor(
    public segmentservice: SegmentService,
    private route: Router,
    private actRoute: ActivatedRoute
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

    this.fetchSegments();
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

  sortData(respData: any) {
    return respData.sort((a: any, b: any) => {
      return <any>new Date(a.createdAt) - <any>new Date(b.createdAt);
    });
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
