import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SegmentService } from '../../core/services/segments.service';

@Component({
  selector: 'app-sidebarnew',
  standalone: true,
  imports: [CommonModule, NgScrollbarModule, ScrollingModule],
  templateUrl: './sidebarnew.component.html',
  styleUrl: './sidebarnew.component.css'
})
export class SidebarnewComponent implements OnInit {

  activeItem: string = '';
  isSettingsOpen = false;
  isReportsOpen = false;
  segmentlist: any[] = [];
  segmentId: string = '';
  selectedSegment: any;
  activeSegmentId: string | null = null;
  activeSubMenuId: string | null = null;
  activeSubSubMenuId: string | null = null;
  colorCode: string = '#f8f6bd'; // Default color code

  constructor(
     public segmentservice: SegmentService,
  ) { }

  ngOnInit() {
    this.segmentlist = [
      {
        "_id": "67ebcbefed786b75cfcd7112",
        "title": "Segment 1",
        "category": [
          {
            "_id": "67ebc9bdffdb1b6f21ac9f2c",
            "value": "classroom",
            "label": "Class Room",
            "colorCode": "#e5f9ee",
            "createdAt": "2025-04-01T11:10:53.983Z",
            "updatedAt": "2025-04-01T11:10:53.983Z"
          }
        ],
        "status": "active",
        "createdAt": "2025-04-01T11:20:15.900Z",
        "updatedAt": "2025-04-01T11:20:15.900Z"
      },
      {
        "_id": "67ebcbf8ed786b75cfcd7118",
        "title": "Segment 2",
        "category": [
          {
            "_id": "67ebc9bdffdb1b6f21ac9f2c",
            "value": "classroom",
            "label": "Class Room",
            "colorCode": "#e5f9ee",
            "createdAt": "2025-04-01T11:10:53.983Z",
            "updatedAt": "2025-04-01T11:10:53.983Z"
          },
          {
            "_id": "67ebc9beffdb1b6f21ac9f2f",
            "value": "selfpractice",
            "label": "Self-Practice",
            "colorCode": "#c1dbe8",
            "createdAt": "2025-04-01T11:10:54.079Z",
            "updatedAt": "2025-04-01T11:10:54.079Z"
          }
        ],
        "status": "active",
        "createdAt": "2025-04-01T11:20:24.516Z",
        "updatedAt": "2025-04-01T11:20:24.516Z"
      },
      {
        "_id": "67ebcc02ed786b75cfcd711e",
        "title": "Segment 3",
        "category": [
          {
            "_id": "67ebc9bdffdb1b6f21ac9f2c",
            "value": "classroom",
            "label": "Class Room",
            "colorCode": "#e5f9ee",
            "createdAt": "2025-04-01T11:10:53.983Z",
            "updatedAt": "2025-04-01T11:10:53.983Z"
          },
          {
            "_id": "67ebc9beffdb1b6f21ac9f2f",
            "value": "selfpractice",
            "label": "Self-Practice",
            "colorCode": "#c1dbe8",
            "createdAt": "2025-04-01T11:10:54.079Z",
            "updatedAt": "2025-04-01T11:10:54.079Z"
          },
          {
            "_id": "67ebc9beffdb1b6f21ac9f32",
            "value": "practicewithmaster",
            "label": "Practice With the Master",
            "colorCode": "#f8f6bd",
            "createdAt": "2025-04-01T11:10:54.173Z",
            "updatedAt": "2025-04-01T11:10:54.173Z",
            "subjects": [
              {
                "_id": "67ecebfc04072134f7122ec1",
                "name": "1.1 Hahaan",
                "segmentId": "67ebcc02ed786b75cfcd711e",
                "videoUrl": "https://",
                "shorts": [
                  {
                    "shortUrl": "https://",
                    "question": "Test",
                    "answer": "Test",
                    "isDeleted": false,
                    "_id": null
                  }
                ],
                "status": "active",
                "createdAt": "2025-04-02T07:49:16.529Z",
                "updatedAt": "2025-04-02T07:49:16.529Z"
              },
              {
                "_id": "67ed3763da9499d3ed44c15b",
                "name": "demo2",
                "segmentId": "67ebcc02ed786b75cfcd711e",
                "description": "demo2",
                "videoUrl": "https://vimeo.com",
                "shorts": [
                  {
                    "shortUrl": "https://vimeo.com",
                    "question": "what is your country?",
                    "answer": "India",
                    "isDeleted": false,
                    "_id": "67ed3763da9499d3ed44c15c"
                  }
                ],
                "status": "active",
                "createdAt": "2025-04-02T13:10:59.562Z",
                "updatedAt": "2025-04-02T13:10:59.562Z"
              }
            ]
          }
        ],
        "status": "active",
        "createdAt": "2025-04-01T11:20:34.217Z",
        "updatedAt": "2025-04-01T11:20:34.217Z"
      },
      {
        "_id": "67ebcc0bed786b75cfcd7124",
        "title": "Segment 4",
        "category": [
          {
            "_id": "67ebc9bdffdb1b6f21ac9f2c",
            "value": "classroom",
            "label": "Class Room",
            "colorCode": "#e5f9ee",
            "createdAt": "2025-04-01T11:10:53.983Z",
            "updatedAt": "2025-04-01T11:10:53.983Z"
          },
          {
            "_id": "67ebc9beffdb1b6f21ac9f2f",
            "value": "selfpractice",
            "label": "Self-Practice",
            "colorCode": "#c1dbe8",
            "createdAt": "2025-04-01T11:10:54.079Z",
            "updatedAt": "2025-04-01T11:10:54.079Z"
          },
          {
            "_id": "67ebc9beffdb1b6f21ac9f43",
            "value": "practicewithmaster",
            "label": "Practice With the Master",
            "colorCode": "#f8f6bd",
            "createdAt": "2025-04-01T11:10:54.173Z",
            "updatedAt": "2025-04-01T11:10:54.173Z",
            "subjects": [
              {
                "_id": "67ec01a9f9ca16aa3577dcaf",
                "name": "1.1 Pronoun",
                "segmentId": "67ebcc0bed786b75cfcd7124",
                "videoUrl": "https://vimeo.com",
                "shorts": [
                  {
                    "shortUrl": "https://vimeo.com",
                    "question": "Whats Your Name ?",
                    "answer": "Hi",
                    "isDeleted": false,
                    "_id": "67ec01a9f9ca16aa3577dcb0"
                  },
                  {
                    "shortUrl": "https://vimeo.com/2",
                    "question": "Whats Your Age ?",
                    "answer": "22",
                    "isDeleted": false,
                    "_id": "67ec01a9f9ca16aa3577dcb1"
                  }
                ],
                "status": "active",
                "createdAt": "2025-04-01T15:09:29.945Z",
                "updatedAt": "2025-04-01T15:09:29.945Z"
              },
              {
                "_id": "67eccaef106167972fb11141",
                "name": "1.2 Surface",
                "segmentId": "67ebcc0bed786b75cfcd7124",
                "videoUrl": "https://",
                "shorts": [
                  {
                    "shortUrl": "https://",
                    "question": "Test",
                    "answer": "Test",
                    "isDeleted": false,
                    "_id": "67eccaef106167972fb11142"
                  },
                  {
                    "shortUrl": "https://",
                    "question": "Test 2",
                    "answer": "Test 2",
                    "isDeleted": false,
                    "_id": "67eccaef106167972fb11143"
                  },
                  {
                    "shortUrl": "https://",
                    "question": "Test 3",
                    "answer": "Test 3",
                    "isDeleted": false,
                    "_id": "67ecdf386d68804f41434c44"
                  }
                ],
                "status": "active",
                "createdAt": "2025-04-02T05:28:15.945Z",
                "updatedAt": "2025-04-02T06:54:48.359Z"
              },
              {
                "_id": "67ed36fd04072134f7122fc0",
                "name": "1.3 Pratice",
                "segmentId": "67ebcc0bed786b75cfcd7124",
                "videoUrl": "https://",
                "shorts": [
                  {
                    "shortUrl": "https://",
                    "question": "Whatasdlkfjsldfjldsafjdsalfjdsalfjdsa;fldsajfldsajf;ldsafdsalfjdsalfjdsaf",
                    "answer": "fdsalfkjsadflsaj;fdsajf;asjdf",
                    "isDeleted": false,
                    "_id": null
                  },
                  {
                    "shortUrl": "https://",
                    "question": "alskfjaosfasjflasj",
                    "answer": "asdlfjasdofisadjflj",
                    "isDeleted": false,
                    "_id": null
                  }
                ],
                "status": "active",
                "createdAt": "2025-04-02T13:09:17.535Z",
                "updatedAt": "2025-04-02T13:10:42.029Z"
              },
              {
                "_id": "67ee3882c4cefbdf640018fd",
                "name": "trail",
                "segmentId": "67ebcc0bed786b75cfcd7124",
                "description": "trail",
                "videoUrl": "https://vimeo.com",
                "shorts": [
                  {
                    "shortUrl": "https://vimeo.com",
                    "question": "string",
                    "answer": "string",
                    "isDeleted": false,
                    "_id": "67ee3882c4cefbdf640018fe"
                  }
                ],
                "status": "active",
                "createdAt": "2025-04-03T07:28:02.657Z",
                "updatedAt": "2025-04-03T07:28:02.657Z"
              }
            ]
          },
          {
            "_id": "67ebc9beffdb1b6f21ac9f35",
            "value": "speakingroom",
            "label": "Speaking Room",
            "colorCode": "#f1ecff",
            "createdAt": "2025-04-01T11:10:54.267Z",
            "updatedAt": "2025-04-01T11:10:54.267Z"
          }
        ],
        "status": "active",
        "createdAt": "2025-04-01T11:20:43.810Z",
        "updatedAt": "2025-04-01T11:20:43.810Z"
      }
    ];

    // this.fetchSegments();
    this.activeSegmentId = "67ebcc02ed786b75cfcd711e";
    this.activeSubMenuId = "67ebc9beffdb1b6f21ac9f32";
    this.activeSubSubMenuId = "67ecebfc04072134f7122ec1";
  }

  setActive(item: string) {
    this.activeItem = item;
  }

  toggleSubmenu(segment: any, event: Event) {
    event.stopPropagation(); // Prevents click from affecting parent elements
    // segment.expanded = !segment.expanded;
    this.setActiveSegment(segment._id);
  }

  setActiveSegment(segmentId: string) {
    this.activeSegmentId = segmentId;
    this.activeSubMenuId = null; // Reset submenus
    this.activeSubSubMenuId = null;
  }
  
  toggleSubSubmenu(subMenu: any, event: Event) {
    this.colorCode = subMenu.colorCode; // Set color code from subMenu
    event.stopPropagation(); // Prevents click from affecting parent elements
    // subMenu.expanded = !subMenu.expanded;
    this.setActiveSubMenu(subMenu._id, event);
  }

  setActiveSubMenu(subMenuId: string, event: Event) {
    event.stopPropagation(); // Prevent parent click event
    this.activeSubMenuId = subMenuId;
    this.activeSubSubMenuId = null; // Reset sub-submenus
  }
  
  setActiveSubSubMenu(subSubMenuId: string, event: Event, menuName:any) {
    event.stopPropagation(); // Prevent parent click event
    this.activeSubSubMenuId = subSubMenuId;

    // Check if the pseudo-element is active
    setTimeout(() => { // Ensures DOM updates are complete
      let element1 = event.target as HTMLElement;
      let computedStyle = window.getComputedStyle(element1, '::before');
      let color = computedStyle.getPropertyValue('color');
      // color = this.getColorCode(menuName);
      console.log('Pseudo-element background color:', this.colorCode);

      element1.style.setProperty('--before-color', this.colorCode);
    }, 0);
  }

  getColorCode(menuName: any) {
    let colorCode = '#3f8b5f';
    switch(menuName) {
      case 'Class Room':
        colorCode = '#3f8b5f';
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

  getMenuStyle(menuName:any) {
    let colorCode = this.getColorCode(menuName);
    
    return {
      'color': colorCode,
      'font-size': '20px',
      'position': 'relative',
      'left': '8px',
    };
    
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
      this.selectedSegment = foundSegment;
      console.log('foundedone::', this.selectedSegment);
    } else {
      console.error('Segment not found');
    }
  }
}
