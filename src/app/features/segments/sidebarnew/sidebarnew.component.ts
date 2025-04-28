import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SegmentService } from '../../../shared/services/segments.service';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'app-sidebarnew',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  templateUrl: './sidebarnew.component.html',
  styleUrl: './sidebarnew.component.css',
})
export class SidebarnewComponent implements OnInit {
  public segmentlist: any[] = [];
  activeItem: string = '';
  isSettingsOpen = false;
  isReportsOpen = false;
  segmentId: string = '';
  // selectedSegment: any;
  activeSegmentId: string = '';
  activeSubMenuId: string = '';
  activeSubSubMenuId: string = '';
  colorCode: string = '#f8f6bd'; // Default color code
  @Output() selectedSegment = new EventEmitter<any>();
  @Output() selectedCategory = new EventEmitter<any>();
  @Output() selectedSubject = new EventEmitter<any>();
  darkMode: boolean = false;

  constructor(
    public segmentservice: SegmentService,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.fetchSegments();
  }

  fetchSegments() {
    this.segmentservice.getSegmentList().subscribe(
      (response: any) => {
        if (response.meta.code === 200) {
          this.segmentlist = response.data;
          if (this.segmentlist.length > 0) {
            this.activeSegmentId = this.segmentlist[0]._id;
            this.onSegmentClick(this.activeSegmentId);
          }
        }
      },
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );
  }

  onSegmentClick(segmentId: string) {
    this.activeSegmentId = segmentId;
    const foundSegment = this.segmentlist.find(
      (segment) => String(segment._id) === String(segmentId)
    );

    if (foundSegment) {
      this.selectedSegment.emit(foundSegment);
      this.router.navigate([
        `segments/${foundSegment.slug_url}/${foundSegment.category[0].value}/${foundSegment.category[0].subjects[0].slug_url}`,
      ]);
    } else {
      console.error('Segment not found');
    }
  }

  setActive(item: string) {
    this.activeItem = item;
  }

  toggleSubmenu(segment: any, event: Event) {
    event.stopPropagation(); // Prevents click from affecting parent elements
    this.setActiveSegment(segment._id);
  }

  setActiveSegment(segmentId: string) {
    this.activeSegmentId = segmentId;
    this.activeSubMenuId = ''; // Reset submenus
    this.activeSubSubMenuId = ''; // Reset sub-submenus
  }

  toggleSubSubmenu(subMenu: any, event: Event) {
    this.colorCode = subMenu.colorCode; // Set color code from subMenu
    event.stopPropagation(); // Prevents click from affecting parent elements
    this.setActiveSubMenu(subMenu._id, event);
  }

  setActiveSubMenu(subMenuId: string, event: Event) {
    event.stopPropagation(); // Prevent parent click event
    this.activeSubMenuId = subMenuId;
    this.activeSubSubMenuId = ''; // Reset sub-submenus

    // this.selectedClassroom.emit(foundSegment.category[0].subjects[0]);
  }

  setActiveSubSubMenu(
    subSubMenuId: string,
    event: Event,
    subMenu: any,
    subSubMenu: any
  ) {
    event.stopPropagation(); // Prevent parent click event
    this.activeSubSubMenuId = subSubMenuId;

    // Check if the pseudo-element is active
    setTimeout(() => {
      // Ensures DOM updates are complete
      let element1 = event.target as HTMLElement;
      let computedStyle = window.getComputedStyle(element1, '::before');
      let color = computedStyle.getPropertyValue('color');
      // color = this.getColorCode(menuName);
      console.log('Pseudo-element background color:', this.colorCode);

      element1.style.setProperty('--before-color', this.colorCode);
    }, 0);
    this.selectedCategory.emit(subMenu);
    this.selectedSubject.emit(subSubMenu);
    this.commonService.setSubject(subSubMenu);
    this.navigate();
    const foundSegment = this.segmentlist.find(
      (segment) => String(segment._id) === String(this.activeSegmentId)
    );
    const foundCategory = foundSegment.category.find(
      (category: any) => String(category._id) === String(this.activeSubMenuId)
    );
    const foundSubject = foundCategory.subjects.find(
      (subject: any) => String(subject._id) === String(this.activeSubSubMenuId)
    );
    console.log(
      'segments/$',
      `segments/${foundSegment.slug_url}/${foundCategory.value}/${foundSubject.slug_url}`
    );
    this.router.navigate([
      `segments/${foundSegment.slug_url}/${foundCategory.value}/${foundSubject.slug_url}`,
    ]);
  }

  navigate() {}

  getColorCode(menuName: any) {
    let colorCode = '#47c747';
    switch (menuName) {
      case 'Class Room':
        colorCode = '#47c747';
        break;
      case 'Self-Practice':
        colorCode = '#f8f6bd';
        break;
      case 'Practice With Master':
        colorCode = '#4c8baa';
        break;
      case 'Speaking Room':
        colorCode = '#7a68ad';
        break;
    }

    return colorCode;
  }

  getMenuStyle(menuName: any) {
    let colorCode = this.getColorCode(menuName);

    return {
      color: colorCode,
      'font-size': '20px',
      position: 'relative',
      left: '8px',
    };
  }
}
