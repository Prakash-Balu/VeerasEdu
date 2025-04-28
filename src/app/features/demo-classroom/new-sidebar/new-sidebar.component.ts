import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CdkScrollable, ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-new-sidebar',
  standalone: true,
  imports: [CommonModule, NgScrollbarModule, ScrollingModule],
  templateUrl: './new-sidebar.component.html',
  styleUrl: './new-sidebar.component.css'
})
export class NewSidebarComponent {
  activeItem: string = '';
  isSettingsOpen = false;
  isReportsOpen = false;
  segmentlist: any[] = [];
  activeSegmentId: string | null = null;
  activeSubMenuId: string | null = null;
  activeSubSubMenuId: string | null = null;
  // @ViewChild(CdkScrollable) scrollable!: CdkScrollable;

  // ngAfterViewInit() {
  //   this.scrollable.elementScrolled().subscribe(() => {
  //     console.log("User is scrolling the sidebar!");
  //   });
  // }

  ngOnInit() {
    this.segmentlist = [
      {
        _id: '6735c99727a6da66983a3096',
        name: 'SEGMENT-1',
        description: 'SEGMENT-1',
        video_url:
          'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        pageName: 'classroom',
        routeUrl: 'class-room',
        createdAt: '2024-11-14T09:57:43.692Z',
        updatedAt: '2024-11-14T09:57:43.692Z',
        expanded: true,
        subMenu: [
          {
            _id: '6735c99727a6da66983a3097',
            name: 'Class Room',
            description: 'Class Room',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
            expanded: true,
            subSubMenu: [
              {
                _id: '6735c99727a6da66983a3098',
                name: '1.1 Pronoun',
                description: '1.1 Pronoun',
                video_url:
                  'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
                pageName: 'classroom',
                routeUrl: 'class-room',
                createdAt: '2024-11-14T09:57:43.692Z',
                updatedAt: '2024-11-14T09:57:43.692Z',
              },
              {
                _id: '6735c99727a6da66983a3099',
                name: '1.2 Supportive Verbs',
                description: '1.2 Supportive Verbs',
                video_url:
                  'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
                pageName: 'classroom',
                routeUrl: 'class-room',
                createdAt: '2024-11-14T09:57:43.692Z',
                updatedAt: '2024-11-14T09:57:43.692Z',
              },
              {
                _id: '6735c99727a6da66983a3100',
                name: '1.3 Example Sentence',
                description: '1.3 Example Sentence',
                video_url:
                  'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
                pageName: 'classroom',
                routeUrl: 'class-room',
                createdAt: '2024-11-14T09:57:43.692Z',
                updatedAt: '2024-11-14T09:57:43.692Z',
              },
            ],
          },
          {
            _id: '6735c99727a6da66983a3101',
            name: 'Self-Practice',
            description: 'Self-Practice',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
            subSubMenu: [
              {
                _id: '6735c99727a6da66983a3201',
                name: '1.1 Pronoun',
                description: '1.1 Pronoun',
                video_url:
                  'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
                pageName: 'classroom',
                routeUrl: 'class-room',
                createdAt: '2024-11-14T09:57:43.692Z',
                updatedAt: '2024-11-14T09:57:43.692Z',
              },
              {
                _id: '6735c99727a6da66983a3202',
                name: '1.2 Supportive Verbs',
                description: '1.2 Supportive Verbs',
                video_url:
                  'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
                pageName: 'classroom',
                routeUrl: 'class-room',
                createdAt: '2024-11-14T09:57:43.692Z',
                updatedAt: '2024-11-14T09:57:43.692Z',
              },
            ],
          },
          {
            _id: '6735c99727a6da66983a3102',
            name: 'Practice With Master',
            description: 'Practice With Master',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
            subSubMenu: [
              {
                _id: '6735c99727a6da66983a3301',
                name: '1.1 Pronoun',
                description: '1.1 Pronoun',
                video_url:
                  'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
                pageName: 'classroom',
                routeUrl: 'class-room',
                createdAt: '2024-11-14T09:57:43.692Z',
                updatedAt: '2024-11-14T09:57:43.692Z',
              },
              {
                _id: '6735c99727a6da66983a3302',
                name: '1.2 Supportive Verbs',
                description: '1.2 Supportive Verbs',
                video_url:
                  'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
                pageName: 'classroom',
                routeUrl: 'class-room',
                createdAt: '2024-11-14T09:57:43.692Z',
                updatedAt: '2024-11-14T09:57:43.692Z',
              },
            ],
          },
          {
            _id: '6735c99727a6da66983a3125',
            name: 'Speaking Room',
            description: 'Speaking Room',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
            subSubMenu: [
              {
                _id: '6735c99727a6da66983a3401',
                name: 'Practice - 1.1',
                description: 'Practice - 1.1',
                video_url:
                  'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
                pageName: 'classroom',
                routeUrl: 'class-room',
                createdAt: '2024-11-14T09:57:43.692Z',
                updatedAt: '2024-11-14T09:57:43.692Z',
              },
              {
                _id: '6735c99727a6da66983a3402',
                name: 'Practice - 1.2',
                description: 'Practice - 1.2',
                video_url:
                  'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
                pageName: 'classroom',
                routeUrl: 'class-room',
                createdAt: '2024-11-14T09:57:43.692Z',
                updatedAt: '2024-11-14T09:57:43.692Z',
              },
            ],
          },
        ],
      },
      {
        _id: '6735c9b927a6da66983a309b',
        name: 'SEGMENT-2',
        description: 'SEGMENT-2',
        video_url:
          'https://player.vimeo.com/video/1019160112?title=0&amp;byline=0&amp;portrait=0&amp;dnt=1&amp;transparent=0&amp;app_id=122963',
        pageName: 'classroom',
        routeUrl: 'class-room',
        createdAt: '2024-11-14T09:58:17.169Z',
        updatedAt: '2024-11-14T09:58:17.169Z',
        expanded: false,
        subMenu: [
          {
            _id: '6735c99727a6da66983a3103',
            name: 'Class Room',
            description: 'Class Room',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3104',
            name: 'Self-Practice',
            description: 'Self-Practice',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3105',
            name: 'Practice With Master',
            description: 'Practice With Master',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
        ],
      },
      {
        _id: '6735ca0127a6da66983a30a6',
        name: 'SEGMENT-3',
        description: 'SEGMENT-3',
        video_url:
          'https://player.vimeo.com/video/1019160112?title=0&amp;byline=0&amp;portrait=0&amp;dnt=1&amp;transparent=0&amp;app_id=122963',
        pageName: 'classroom',
        routeUrl: 'class-room',
        createdAt: '2024-11-14T09:59:29.908Z',
        updatedAt: '2024-11-14T09:59:29.908Z',
        expanded: false,
        subMenu: [
          {
            _id: '6735c99727a6da66983a3106',
            name: 'Class Room',
            description: 'Class Room',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3107',
            name: 'Self-Practice',
            description: 'Self-Practice',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3108',
            name: 'Practice With Master',
            description: 'Practice With Master',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
        ],
      },
      {
        _id: '6735ca1327a6da66983a30ab',
        name: 'SEGMENT-4',
        description: 'SEGMENT-4',
        video_url:
          'https://player.vimeo.com/video/1019160112?title=0&amp;byline=0&amp;portrait=0&amp;dnt=1&amp;transparent=0&amp;app_id=122963',
        pageName: 'classroom',
        routeUrl: 'class-room',
        createdAt: '2024-11-14T09:59:47.940Z',
        updatedAt: '2024-11-14T09:59:47.940Z',
        expanded: false,
        subMenu: [
          {
            _id: '6735c99727a6da66983a3109',
            name: 'Class Room',
            description: 'Class Room',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3110',
            name: 'Self-Practice',
            description: 'Self-Practice',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3111',
            name: 'Practice With Master',
            description: 'Practice With Master',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
        ],
      },
      {
        _id: '6735ca2327a6da66983a30b0',
        name: 'SEGMENT-5',
        description: 'SEGMENT-5',
        video_url:
          'https://player.vimeo.com/video/1019160112?title=0&amp;byline=0&amp;portrait=0&amp;dnt=1&amp;transparent=0&amp;app_id=122963',
        pageName: 'classroom',
        routeUrl: 'class-room',
        createdAt: '2024-11-14T10:00:03.847Z',
        updatedAt: '2024-11-14T10:00:03.847Z',
        expanded: false,
        subMenu: [
          {
            _id: '6735c99727a6da66983a3112',
            name: 'Class Room',
            description: 'Class Room',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3113',
            name: 'Self-Practice',
            description: 'Self-Practice',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3114',
            name: 'Practice With Master',
            description: 'Practice With Master',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
        ],
      },
      {
        _id: '6735ca2327a6da66983a30b1',
        name: 'SEGMENT-6',
        description: 'SEGMENT-6',
        video_url:
          'https://player.vimeo.com/video/1019160112?title=0&amp;byline=0&amp;portrait=0&amp;dnt=1&amp;transparent=0&amp;app_id=122963',
        pageName: 'classroom',
        routeUrl: 'class-room',
        createdAt: '2024-11-14T10:00:03.847Z',
        updatedAt: '2024-11-14T10:00:03.847Z',
        expanded: false,
        subMenu: [
          {
            _id: '6735c99727a6da66983a3115',
            name: 'Class Room',
            description: 'Class Room',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3116',
            name: 'Self-Practice',
            description: 'Self-Practice',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3117',
            name: 'Practice With Master',
            description: 'Practice With Master',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
        ],
      },
      {
        _id: '6735ca2327a6da66983a30b2',
        name: 'SEGMENT-7',
        description: 'SEGMENT-7',
        video_url:
          'https://player.vimeo.com/video/1019160112?title=0&amp;byline=0&amp;portrait=0&amp;dnt=1&amp;transparent=0&amp;app_id=122963',
        pageName: 'classroom',
        routeUrl: 'class-room',
        createdAt: '2024-11-14T10:00:03.847Z',
        updatedAt: '2024-11-14T10:00:03.847Z',
        expanded: false,
        subMenu: [
          {
            _id: '6735c99727a6da66983a3115',
            name: 'Class Room',
            description: 'Class Room',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3116',
            name: 'Self-Practice',
            description: 'Self-Practice',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3117',
            name: 'Practice With Master',
            description: 'Practice With Master',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
        ],
      },
      {
        _id: '6735ca2327a6da66983a30b3',
        name: 'SEGMENT-8',
        description: 'SEGMENT-8',
        video_url:
          'https://player.vimeo.com/video/1019160112?title=0&amp;byline=0&amp;portrait=0&amp;dnt=1&amp;transparent=0&amp;app_id=122963',
        pageName: 'classroom',
        routeUrl: 'class-room',
        createdAt: '2024-11-14T10:00:03.847Z',
        updatedAt: '2024-11-14T10:00:03.847Z',
        expanded: false,
        subMenu: [
          {
            _id: '6735c99727a6da66983a3118',
            name: 'Class Room',
            description: 'Class Room',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3116',
            name: 'Self-Practice',
            description: 'Self-Practice',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3119',
            name: 'Practice With Master',
            description: 'Practice With Master',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
        ],
      },
      {
        _id: '6735ca2327a6da66983a30b4',
        name: 'SEGMENT-9',
        description: 'SEGMENT-9',
        video_url:
          'https://player.vimeo.com/video/1019160112?title=0&amp;byline=0&amp;portrait=0&amp;dnt=1&amp;transparent=0&amp;app_id=122963',
        pageName: 'classroom',
        routeUrl: 'class-room',
        createdAt: '2024-11-14T10:00:03.847Z',
        updatedAt: '2024-11-14T10:00:03.847Z',
        expanded: false,
        subMenu: [
          {
            _id: '6735c99727a6da66983a3120',
            name: 'Class Room',
            description: 'Class Room',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3121',
            name: 'Self-Practice',
            description: 'Self-Practice',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3122',
            name: 'Practice With Master',
            description: 'Practice With Master',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
        ],
      },
      {
        _id: '6735ca2327a6da66983a30b5',
        name: 'SEGMENT-10',
        description: 'SEGMENT-10',
        video_url:
          'https://player.vimeo.com/video/1019160112?title=0&amp;byline=0&amp;portrait=0&amp;dnt=1&amp;transparent=0&amp;app_id=122963',
        pageName: 'classroom',
        routeUrl: 'class-room',
        createdAt: '2024-11-14T10:00:03.847Z',
        updatedAt: '2024-11-14T10:00:03.847Z',
        expanded: false,
        subMenu: [
          {
            _id: '6735c99727a6da66983a3123',
            name: 'Class Room',
            description: 'Class Room',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3124',
            name: 'Self-Practice',
            description: 'Self-Practice',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3125',
            name: 'Practice With Master',
            description: 'Practice With Master',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
        ],
      },
    ];

    this.activeSegmentId = "6735c99727a6da66983a3096";
    this.activeSubMenuId = "6735c99727a6da66983a3097";
    this.activeSubSubMenuId = "6735c99727a6da66983a3098";
  }

  setActive(item: string) {
    this.activeItem = item;
  }

  // toggleMenu(segment: any) {
  //   segment.expanded = !segment.expanded;
  // }

  toggleSubmenu(segment: any, event: Event) {
    event.stopPropagation(); // Prevents click from affecting parent elements
    segment.expanded = !segment.expanded;
    this.setActiveSegment(segment._id);
  }

  setActiveSegment(segmentId: string) {
    this.activeSegmentId = segmentId;
    this.activeSubMenuId = null; // Reset submenus
    this.activeSubSubMenuId = null;
  }
  
  toggleSubSubmenu(subMenu: any, event: Event) {
    event.stopPropagation(); // Prevents click from affecting parent elements
    subMenu.expanded = !subMenu.expanded;
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
      color = this.getColorCode(menuName);
      console.log('Pseudo-element background color:', color);

      element1.style.setProperty('--before-color', color);
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
}
