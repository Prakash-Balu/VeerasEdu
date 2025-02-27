import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgScrollbarModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  activeItem: string = '';
  isSettingsOpen = false;
  isReportsOpen = false;
  segmentlist: any[] = [];
  activeSegmentId: string | null = null;
  activeSubMenuId: string | null = null;
  activeSubSubMenuId: string | null = null;

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
            name: 'CLASS ROOM',
            description: 'CLASS ROOM',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
            expanded: false,
            subSubMenu: [
              {
                _id: '6735c99727a6da66983a3098',
                name: '1.1 PRONOUN',
                description: '1.1 PRONOUN',
                video_url:
                  'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
                pageName: 'classroom',
                routeUrl: 'class-room',
                createdAt: '2024-11-14T09:57:43.692Z',
                updatedAt: '2024-11-14T09:57:43.692Z',
              },
              {
                _id: '6735c99727a6da66983a3099',
                name: '1.2 PRONOUN',
                description: '1.2 PRONOUN',
                video_url:
                  'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
                pageName: 'classroom',
                routeUrl: 'class-room',
                createdAt: '2024-11-14T09:57:43.692Z',
                updatedAt: '2024-11-14T09:57:43.692Z',
              },
              {
                _id: '6735c99727a6da66983a3100',
                name: '1.3 PRONOUN',
                description: '1.3 PRONOUN',
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
            name: 'SELF PRACTICE',
            description: 'SELF PRACTICE',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3102',
            name: 'PRACTICE WITH MASTER',
            description: 'PRACTICE WITH MASTER',
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
            name: 'CLASS ROOM',
            description: 'CLASS ROOM',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3104',
            name: 'SELF PRACTICE',
            description: 'SELF PRACTICE',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3105',
            name: 'PRACTICE WITH MASTER',
            description: 'PRACTICE WITH MASTER',
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
            name: 'CLASS ROOM',
            description: 'CLASS ROOM',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3107',
            name: 'SELF PRACTICE',
            description: 'SELF PRACTICE',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3108',
            name: 'PRACTICE WITH MASTER',
            description: 'PRACTICE WITH MASTER',
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
            name: 'CLASS ROOM',
            description: 'CLASS ROOM',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3110',
            name: 'SELF PRACTICE',
            description: 'SELF PRACTICE',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3111',
            name: 'PRACTICE WITH MASTER',
            description: 'PRACTICE WITH MASTER',
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
            name: 'CLASS ROOM',
            description: 'CLASS ROOM',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3113',
            name: 'SELF PRACTICE',
            description: 'SELF PRACTICE',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3114',
            name: 'PRACTICE WITH MASTER',
            description: 'PRACTICE WITH MASTER',
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
            name: 'CLASS ROOM',
            description: 'CLASS ROOM',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3116',
            name: 'SELF PRACTICE',
            description: 'SELF PRACTICE',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3117',
            name: 'PRACTICE WITH MASTER',
            description: 'PRACTICE WITH MASTER',
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
            name: 'CLASS ROOM',
            description: 'CLASS ROOM',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3116',
            name: 'SELF PRACTICE',
            description: 'SELF PRACTICE',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3117',
            name: 'PRACTICE WITH MASTER',
            description: 'PRACTICE WITH MASTER',
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
            _id: '6735c99727a6da66983a3115',
            name: 'CLASS ROOM',
            description: 'CLASS ROOM',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3116',
            name: 'SELF PRACTICE',
            description: 'SELF PRACTICE',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3117',
            name: 'PRACTICE WITH MASTER',
            description: 'PRACTICE WITH MASTER',
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
            _id: '6735c99727a6da66983a3115',
            name: 'CLASS ROOM',
            description: 'CLASS ROOM',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3116',
            name: 'SELF PRACTICE',
            description: 'SELF PRACTICE',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3117',
            name: 'PRACTICE WITH MASTER',
            description: 'PRACTICE WITH MASTER',
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
            _id: '6735c99727a6da66983a3115',
            name: 'CLASS ROOM',
            description: 'CLASS ROOM',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3116',
            name: 'SELF PRACTICE',
            description: 'SELF PRACTICE',
            video_url:
              'https://player.vimeo.com/video/1024349340?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            pageName: 'classroom',
            routeUrl: 'class-room',
            createdAt: '2024-11-14T09:57:43.692Z',
            updatedAt: '2024-11-14T09:57:43.692Z',
          },
          {
            _id: '6735c99727a6da66983a3117',
            name: 'PRACTICE WITH MASTER',
            description: 'PRACTICE WITH MASTER',
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
  
  setActiveSubSubMenu(subSubMenuId: string, event: Event) {
    event.stopPropagation(); // Prevent parent click event
    this.activeSubSubMenuId = subSubMenuId;
  }
}
