import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SegmentService } from '../../shared/services/segments.service';
import { MaterialModule } from '../../material-module';

import { DomSanitizer } from '@angular/platform-browser';
import { SidebarnewComponent } from '../../layout/sidebarnew/sidebarnew.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { breadCrumbItems } from '../../core/interfaces/breadcrumbs';

@Component({
  selector: 'app-segments',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    RouterOutlet,
    MaterialModule,
    BreadcrumbsComponent,
    SidebarnewComponent,
    ScrollingModule,
  ],
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.css'],
})
export class SegmentsComponent {
  isSidebarVisible: boolean = true;
  videoObj: any = {};
  segmentlist: any[] = [];
  notifications: any[] = [];
  asked: any[] = [];
  answered: any[] = [];
  selectedSegment: any;
  segmentId: string = '';
  currentUrl: string = '';
  activeSegmentId: string | null = null;
  page!: string;
  selectedSubject: any = {};
  selectedCategory: any = {};
  breadCrumbItems: breadCrumbItems[] = [];

  constructor(
    public segmentservice: SegmentService,
    private route: Router,
    private actRoute: ActivatedRoute,

    private domSanitizer: DomSanitizer
  ) {
    this.breadCrumbItems = [
      { label: 'Segment-1' },
      { label: '1.1 Pronoun', active: true },
    ];
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  ngOnInit() {
    document.documentElement.style.overflowY = 'hidden';
    this.currentUrl = this.route.url;

    this.actRoute.children.forEach((childRoute) => {
      childRoute.data.subscribe((data) => {
        console.log('Child Route Data:', data);
        this.page = data['page'];
      });
    });

    // this.fetchSegments();
    // this.viewNotification();
  }
  ngOnDestroy() {
    document.documentElement.style.overflowY = 'auto';
  }

  fetchSegments() {
    this.segmentservice.getSegmentList().subscribe(
      (response: any) => {
        if (response.meta.code === 200) {
          this.segmentlist = this.sortData(response.data);
          if (this.segmentlist.length > 0) {
            this.segmentId = this.segmentlist[0]._id;
            this.onSegmentClick(this.segmentId);
          }
        }
      },
      (error: any) => {
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
      (error: any) => {
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

  getSelectedSegment(selectedSegment: any) {
    console.log('Selected Segment:', selectedSegment);
    this.selectedSegment = selectedSegment;
  }

  getSelectedCategory(selectedCategory: any) {
    console.log('Selected Category:', selectedCategory);
    this.selectedSubject = selectedCategory;

    this.page = selectedCategory.label;
  }

  getSelectedSubject(selectedSubject: any) {
    console.log('Selected Subject:', selectedSubject);
    this.selectedSubject = selectedSubject;
    // this.actRoute.snapshot.data['selectedSub'] = selectedSubject;

    this.breadCrumbItems = [
      { label: this.selectedSegment.title },
      { label: this.selectedSubject.name, active: true },
    ];
  }
}
