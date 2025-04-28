import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SegmentService } from '../../shared/services/segments.service';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-sidebarnew',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  templateUrl: './sidebarnew.component.html',
  styleUrl: './sidebarnew.component.css',
})
export class SidebarnewComponent implements OnInit {
  activeItem: string = '';
  isSettingsOpen = false;
  isReportsOpen = false;
  segmentlist: any[] = [];
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
  ) {
    this.segmentlist = [
      {
        _id: '67ebcbefed786b75cfcd7112',
        title: 'SEGMENT-1',
        category: [
          {
            _id: '67ebc9bdffdb1b6f21ac9f2c',
            value: 'classroom',
            label: 'Class Room',
            colorCode: '#47c747',
            createdAt: '2025-04-01T11:10:53.983Z',
            updatedAt: '2025-04-01T11:10:53.983Z',
          },
        ],
        status: 'active',
        createdAt: '2025-04-01T11:20:15.900Z',
        updatedAt: '2025-04-01T11:20:15.900Z',
      },
      {
        _id: '67ebcbf8ed786b75cfcd7118',
        title: 'SEGMENT-2',
        category: [
          {
            _id: '67ebc9bdffdb1b6f21ac9f2c',
            value: 'classroom',
            label: 'Class Room',
            colorCode: '#47c747',
            createdAt: '2025-04-01T11:10:53.983Z',
            updatedAt: '2025-04-01T11:10:53.983Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f2f',
            value: 'selfpractice',
            label: 'Self-Practice',
            colorCode: '#f8f6bd',
            createdAt: '2025-04-01T11:10:54.079Z',
            updatedAt: '2025-04-01T11:10:54.079Z',
          },
        ],
        status: 'active',
        createdAt: '2025-04-01T11:20:24.516Z',
        updatedAt: '2025-04-01T11:20:24.516Z',
      },
      {
        _id: '67ebcc02ed786b75cfcd711e',
        title: 'SEGMENT-3',
        category: [
          {
            _id: '67ebc9bdffdb1b6f21ac9f2c',
            value: 'classroom',
            label: 'Class Room',
            colorCode: '#47c747',
            createdAt: '2025-04-01T11:10:53.983Z',
            updatedAt: '2025-04-01T11:10:53.983Z',
            subjects: [
              {
                _id: '67ecebfc04072134f7122efe',
                name: '1.1 Pronoun',
                segmentId: '67ebc9bdffdb1b6f21ac9f2c',
                videoUrl: 'https://player.vimeo.com/video/1024349340',
                status: 'active',
                createdAt: '2025-04-02T07:49:16.529Z',
                updatedAt: '2025-04-02T07:49:16.529Z',
              },
              {
                _id: '67ed3763da9499d3ed44c2he',
                name: '1.2 Supportive verbs',
                segmentId: '67ebc9bdffdb1b6f21ac9f2c',
                description: 'demo2',
                videoUrl: 'https://player.vimeo.com/video/1024349340',
                status: 'active',
                createdAt: '2025-04-02T13:10:59.562Z',
                updatedAt: '2025-04-02T13:10:59.562Z',
              },
              {
                _id: '67ed3763da9499d3ed44c2oe',
                name: '1.3 Example Sentences',
                segmentId: '67ebc9bdffdb1b6f21ac9f2c',
                description: 'demo2',
                videoUrl: 'https://player.vimeo.com/video/1024349340',
                status: 'active',
                createdAt: '2025-04-02T13:10:59.562Z',
                updatedAt: '2025-04-02T13:10:59.562Z',
              },
            ],
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f2f',
            value: 'selfpractice',
            label: 'Self-Practice',
            colorCode: '#f8f6bd', //#c1dbe8
            createdAt: '2025-04-01T11:10:54.079Z',
            updatedAt: '2025-04-01T11:10:54.079Z',
            subjects: [
              {
                _id: '67ecebfc04072134f7122fge',
                name: '1.1 Pronoun',
                segmentId: '67ebc9bdffdb1b6f21ac9f2c',
                videoUrl: 'https://player.vimeo.com/video/1024349340',
                status: 'active',
                createdAt: '2025-04-02T07:49:16.529Z',
                updatedAt: '2025-04-02T07:49:16.529Z',
              },
              {
                _id: '67ed3763da9499d3ed44c1ge',
                name: '1.2 Supportive verbs',
                segmentId: '67ebc9bdffdb1b6f21ac9f2c',
                description: 'demo2',
                videoUrl: 'https://player.vimeo.com/video/1024349340',
                status: 'active',
                createdAt: '2025-04-02T13:10:59.562Z',
                updatedAt: '2025-04-02T13:10:59.562Z',
              },
            ],
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f32',
            value: 'practicewithmaster',
            label: 'Practice With Master',
            colorCode: '#c1dbe8',
            createdAt: '2025-04-01T11:10:54.173Z',
            updatedAt: '2025-04-01T11:10:54.173Z',
            subjects: [
              {
                _id: '67ecebfc04072134f7122ec1',
                name: '1.1 Hahaan',
                segmentId: '67ebcc02ed786b75cfcd711e',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question: 'Test',
                    answer: 'Test',
                    isDeleted: false,
                    _id: null,
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T07:49:16.529Z',
                updatedAt: '2025-04-02T07:49:16.529Z',
              },
              {
                _id: '67ed3763da9499d3ed44c15b',
                name: 'demo2',
                segmentId: '67ebcc02ed786b75cfcd711e',
                description: 'demo2',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'what is your country?',
                    answer: 'India',
                    isDeleted: false,
                    _id: '67ed3763da9499d3ed44c15c',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T13:10:59.562Z',
                updatedAt: '2025-04-02T13:10:59.562Z',
              },
            ],
          },
          {
            _id: '67ebc9beffdb1b6f21ac9g22',
            value: 'speakingroom',
            label: 'Speaking Room',
            colorCode: '#f1ecff',
            createdAt: '2025-04-01T11:10:54.173Z',
            updatedAt: '2025-04-01T11:10:54.173Z',
            subjects: [
              {
                _id: '67ecebfc04072134f7122fd1',
                name: '1.1 Hahaan',
                segmentId: '67ebcc02ed786b75cfcd711e',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question: 'Test',
                    answer: 'Test',
                    isDeleted: false,
                    _id: null,
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T07:49:16.529Z',
                updatedAt: '2025-04-02T07:49:16.529Z',
              },
              {
                _id: '67ed3763da9499d3ed44c26b',
                name: 'demo2',
                segmentId: '67ebcc02ed786b75cfcd711e',
                description: 'demo2',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'what is your country?',
                    answer: 'India',
                    isDeleted: false,
                    _id: '67ed3763da9499d3ed44c26c',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T13:10:59.562Z',
                updatedAt: '2025-04-02T13:10:59.562Z',
              },
            ],
          },
        ],
        status: 'active',
        createdAt: '2025-04-01T11:20:34.217Z',
        updatedAt: '2025-04-01T11:20:34.217Z',
      },
      {
        _id: '67ebcc0bed786b75cfcd7124',
        title: 'SEGMENT-4',
        category: [
          {
            _id: '67ebc9bdffdb1b6f21ac9f2c',
            value: 'classroom',
            label: 'Class Room',
            colorCode: '#47c747',
            createdAt: '2025-04-01T11:10:53.983Z',
            updatedAt: '2025-04-01T11:10:53.983Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f2f',
            value: 'selfpractice',
            label: 'Self-Practice',
            colorCode: '#f8f6bd',
            createdAt: '2025-04-01T11:10:54.079Z',
            updatedAt: '2025-04-01T11:10:54.079Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f43',
            value: 'practicewithmaster',
            label: 'Practice With Master',
            colorCode: '#c1dbe8',
            createdAt: '2025-04-01T11:10:54.173Z',
            updatedAt: '2025-04-01T11:10:54.173Z',
            subjects: [
              {
                _id: '67ec01a9f9ca16aa3577dcaf',
                name: '1.1 Pronoun',
                segmentId: '67ebcc0bed786b75cfcd7124',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'Whats Your Name ?',
                    answer: 'Hi',
                    isDeleted: false,
                    _id: '67ec01a9f9ca16aa3577dcb0',
                  },
                  {
                    shortUrl: 'https://vimeo.com/2',
                    question: 'Whats Your Age ?',
                    answer: '22',
                    isDeleted: false,
                    _id: '67ec01a9f9ca16aa3577dcb1',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-01T15:09:29.945Z',
                updatedAt: '2025-04-01T15:09:29.945Z',
              },
              {
                _id: '67eccaef106167972fb11141',
                name: '1.2 Surface',
                segmentId: '67ebcc0bed786b75cfcd7124',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question: 'Test',
                    answer: 'Test',
                    isDeleted: false,
                    _id: '67eccaef106167972fb11142',
                  },
                  {
                    shortUrl: 'https://',
                    question: 'Test 2',
                    answer: 'Test 2',
                    isDeleted: false,
                    _id: '67eccaef106167972fb11143',
                  },
                  {
                    shortUrl: 'https://',
                    question: 'Test 3',
                    answer: 'Test 3',
                    isDeleted: false,
                    _id: '67ecdf386d68804f41434c44',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T05:28:15.945Z',
                updatedAt: '2025-04-02T06:54:48.359Z',
              },
              {
                _id: '67ed36fd04072134f7122fc0',
                name: '1.3 Pratice',
                segmentId: '67ebcc0bed786b75cfcd7124',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question:
                      'Whatasdlkfjsldfjldsafjdsalfjdsalfjdsa;fldsajfldsajf;ldsafdsalfjdsalfjdsaf',
                    answer: 'fdsalfkjsadflsaj;fdsajf;asjdf',
                    isDeleted: false,
                    _id: null,
                  },
                  {
                    shortUrl: 'https://',
                    question: 'alskfjaosfasjflasj',
                    answer: 'asdlfjasdofisadjflj',
                    isDeleted: false,
                    _id: null,
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T13:09:17.535Z',
                updatedAt: '2025-04-02T13:10:42.029Z',
              },
              {
                _id: '67ee3882c4cefbdf640018fd',
                name: 'trail',
                segmentId: '67ebcc0bed786b75cfcd7124',
                description: 'trail',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'string',
                    answer: 'string',
                    isDeleted: false,
                    _id: '67ee3882c4cefbdf640018fe',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-03T07:28:02.657Z',
                updatedAt: '2025-04-03T07:28:02.657Z',
              },
            ],
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f35',
            value: 'speakingroom',
            label: 'Speaking Room',
            colorCode: '#f1ecff',
            createdAt: '2025-04-01T11:10:54.267Z',
            updatedAt: '2025-04-01T11:10:54.267Z',
          },
        ],
        status: 'active',
        createdAt: '2025-04-01T11:20:43.810Z',
        updatedAt: '2025-04-01T11:20:43.810Z',
      },
      {
        _id: '67ebcc0bed786b75cfcd7134',
        title: 'SEGMENT-5',
        category: [
          {
            _id: '67ebc9bdffdb1b6f21ac9f3c',
            value: 'classroom',
            label: 'Class Room',
            colorCode: '#47c747',
            createdAt: '2025-04-01T11:10:53.983Z',
            updatedAt: '2025-04-01T11:10:53.983Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f3f',
            value: 'selfpractice',
            label: 'Self-Practice',
            colorCode: '#f8f6bd',
            createdAt: '2025-04-01T11:10:54.079Z',
            updatedAt: '2025-04-01T11:10:54.079Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f53',
            value: 'practicewithmaster',
            label: 'Practice With Master',
            colorCode: '#c1dbe8',
            createdAt: '2025-04-01T11:10:54.173Z',
            updatedAt: '2025-04-01T11:10:54.173Z',
            subjects: [
              {
                _id: '67ec01a9f9ca16aa3577dcbf',
                name: '1.1 Pronoun',
                segmentId: '67ebcc0bed786b75cfcd7134',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'Whats Your Name ?',
                    answer: 'Hi',
                    isDeleted: false,
                    _id: '67ec01a9f9ca16aa3577dcc0',
                  },
                  {
                    shortUrl: 'https://vimeo.com/2',
                    question: 'Whats Your Age ?',
                    answer: '22',
                    isDeleted: false,
                    _id: '67ec01a9f9ca16aa3577dcc1',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-01T15:09:29.945Z',
                updatedAt: '2025-04-01T15:09:29.945Z',
              },
              {
                _id: '67eccaef106167972fb11141',
                name: '1.2 Surface',
                segmentId: '67ebcc0bed786b75cfcd7134',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question: 'Test',
                    answer: 'Test',
                    isDeleted: false,
                    _id: '67eccaef106167972fb11152',
                  },
                  {
                    shortUrl: 'https://',
                    question: 'Test 2',
                    answer: 'Test 2',
                    isDeleted: false,
                    _id: '67eccaef106167972fb11153',
                  },
                  {
                    shortUrl: 'https://',
                    question: 'Test 3',
                    answer: 'Test 3',
                    isDeleted: false,
                    _id: '67ecdf386d68804f41434c54',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T05:28:15.945Z',
                updatedAt: '2025-04-02T06:54:48.359Z',
              },
              {
                _id: '67ed36fd04072134f7122fc0',
                name: '1.3 Pratice',
                segmentId: '67ebcc0bed786b75cfcd7134',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question:
                      'Whatasdlkfjsldfjldsafjdsalfjdsalfjdsa;fldsajfldsajf;ldsafdsalfjdsalfjdsaf',
                    answer: 'fdsalfkjsadflsaj;fdsajf;asjdf',
                    isDeleted: false,
                    _id: null,
                  },
                  {
                    shortUrl: 'https://',
                    question: 'alskfjaosfasjflasj',
                    answer: 'asdlfjasdofisadjflj',
                    isDeleted: false,
                    _id: null,
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T13:09:17.535Z',
                updatedAt: '2025-04-02T13:10:42.029Z',
              },
              {
                _id: '67ee3882c4cefbdf640018gd',
                name: 'trail',
                segmentId: '67ebcc0bed786b75cfcd7134',
                description: 'trail',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'string',
                    answer: 'string',
                    isDeleted: false,
                    _id: '67ee3882c4cefbdf640018ge',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-03T07:28:02.657Z',
                updatedAt: '2025-04-03T07:28:02.657Z',
              },
            ],
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f45',
            value: 'speakingroom',
            label: 'Speaking Room',
            colorCode: '#f1ecff',
            createdAt: '2025-04-01T11:10:54.267Z',
            updatedAt: '2025-04-01T11:10:54.267Z',
          },
        ],
        status: 'active',
        createdAt: '2025-04-01T11:20:43.810Z',
        updatedAt: '2025-04-01T11:20:43.810Z',
      },
      {
        _id: '67ebcc0bed786b75cfcd7144',
        title: 'SEGMENT-6',
        category: [
          {
            _id: '67ebc9bdffdb1b6f21ac9f5c',
            value: 'classroom',
            label: 'Class Room',
            colorCode: '#47c747',
            createdAt: '2025-04-01T11:10:53.983Z',
            updatedAt: '2025-04-01T11:10:53.983Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f5f',
            value: 'selfpractice',
            label: 'Self-Practice',
            colorCode: '#f8f6bd',
            createdAt: '2025-04-01T11:10:54.079Z',
            updatedAt: '2025-04-01T11:10:54.079Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f63',
            value: 'practicewithmaster',
            label: 'Practice With Master',
            colorCode: '#c1dbe8',
            createdAt: '2025-04-01T11:10:54.173Z',
            updatedAt: '2025-04-01T11:10:54.173Z',
            subjects: [
              {
                _id: '67ec01a9f9ca16aa3577dcgf',
                name: '1.1 Pronoun',
                segmentId: '67ebcc0bed786b75cfcd7144',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'Whats Your Name ?',
                    answer: 'Hi',
                    isDeleted: false,
                    _id: '67ec01a9f9ca16aa3577dcd0',
                  },
                  {
                    shortUrl: 'https://vimeo.com/2',
                    question: 'Whats Your Age ?',
                    answer: '22',
                    isDeleted: false,
                    _id: '67ec01a9f9ca16aa3577dcd1',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-01T15:09:29.945Z',
                updatedAt: '2025-04-01T15:09:29.945Z',
              },
              {
                _id: '67eccaef106167972fb11161',
                name: '1.2 Surface',
                segmentId: '67ebcc0bed786b75cfcd7144',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question: 'Test',
                    answer: 'Test',
                    isDeleted: false,
                    _id: '67eccaef106167972fb11162',
                  },
                  {
                    shortUrl: 'https://',
                    question: 'Test 2',
                    answer: 'Test 2',
                    isDeleted: false,
                    _id: '67eccaef106167972fb11163',
                  },
                  {
                    shortUrl: 'https://',
                    question: 'Test 3',
                    answer: 'Test 3',
                    isDeleted: false,
                    _id: '67ecdf386d68804f41434c64',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T05:28:15.945Z',
                updatedAt: '2025-04-02T06:54:48.359Z',
              },
              {
                _id: '67ed36fd04072134f7122fg0',
                name: '1.3 Pratice',
                segmentId: '67ebcc0bed786b75cfcd7144',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question:
                      'Whatasdlkfjsldfjldsafjdsalfjdsalfjdsa;fldsajfldsajf;ldsafdsalfjdsalfjdsaf',
                    answer: 'fdsalfkjsadflsaj;fdsajf;asjdf',
                    isDeleted: false,
                    _id: null,
                  },
                  {
                    shortUrl: 'https://',
                    question: 'alskfjaosfasjflasj',
                    answer: 'asdlfjasdofisadjflj',
                    isDeleted: false,
                    _id: null,
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T13:09:17.535Z',
                updatedAt: '2025-04-02T13:10:42.029Z',
              },
              {
                _id: '67ee3882c4cefbdf640018jd',
                name: 'trail',
                segmentId: '67ebcc0bed786b75cfcd7144',
                description: 'trail',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'string',
                    answer: 'string',
                    isDeleted: false,
                    _id: '67ee3882c4cefbdf640018je',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-03T07:28:02.657Z',
                updatedAt: '2025-04-03T07:28:02.657Z',
              },
            ],
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f75',
            value: 'speakingroom',
            label: 'Speaking Room',
            colorCode: '#f1ecff',
            createdAt: '2025-04-01T11:10:54.267Z',
            updatedAt: '2025-04-01T11:10:54.267Z',
          },
        ],
        status: 'active',
        createdAt: '2025-04-01T11:20:43.810Z',
        updatedAt: '2025-04-01T11:20:43.810Z',
      },
      {
        _id: '67ebcc0bed786b75cfcd7164',
        title: 'SEGMENT-7',
        category: [
          {
            _id: '67ebc9bdffdb1b6f21ac9f6c',
            value: 'classroom',
            label: 'Class Room',
            colorCode: '#47c747',
            createdAt: '2025-04-01T11:10:53.983Z',
            updatedAt: '2025-04-01T11:10:53.983Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f7f',
            value: 'selfpractice',
            label: 'Self-Practice',
            colorCode: '#f8f6bd',
            createdAt: '2025-04-01T11:10:54.079Z',
            updatedAt: '2025-04-01T11:10:54.079Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f73',
            value: 'practicewithmaster',
            label: 'Practice With Master',
            colorCode: '#c1dbe8',
            createdAt: '2025-04-01T11:10:54.173Z',
            updatedAt: '2025-04-01T11:10:54.173Z',
            subjects: [
              {
                _id: '67ec01a9f9ca16aa3577dcjf',
                name: '1.1 Pronoun',
                segmentId: '67ebcc0bed786b75cfcd7164',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'Whats Your Name ?',
                    answer: 'Hi',
                    isDeleted: false,
                    _id: '67ec01a9f9ca16aa3577dce0',
                  },
                  {
                    shortUrl: 'https://vimeo.com/2',
                    question: 'Whats Your Age ?',
                    answer: '22',
                    isDeleted: false,
                    _id: '67ec01a9f9ca16aa3577dce1',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-01T15:09:29.945Z',
                updatedAt: '2025-04-01T15:09:29.945Z',
              },
              {
                _id: '67eccaef106167972fb11171',
                name: '1.2 Surface',
                segmentId: '67ebcc0bed786b75cfcd7164',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question: 'Test',
                    answer: 'Test',
                    isDeleted: false,
                    _id: '67eccaef106167972fb11172',
                  },
                  {
                    shortUrl: 'https://',
                    question: 'Test 2',
                    answer: 'Test 2',
                    isDeleted: false,
                    _id: '67eccaef106167972fb11173',
                  },
                  {
                    shortUrl: 'https://',
                    question: 'Test 3',
                    answer: 'Test 3',
                    isDeleted: false,
                    _id: '67ecdf386d68804f41434c74',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T05:28:15.945Z',
                updatedAt: '2025-04-02T06:54:48.359Z',
              },
              {
                _id: '67ed36fd04072134f7122fh0',
                name: '1.3 Pratice',
                segmentId: '67ebcc0bed786b75cfcd7164',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question:
                      'Whatasdlkfjsldfjldsafjdsalfjdsalfjdsa;fldsajfldsajf;ldsafdsalfjdsalfjdsaf',
                    answer: 'fdsalfkjsadflsaj;fdsajf;asjdf',
                    isDeleted: false,
                    _id: null,
                  },
                  {
                    shortUrl: 'https://',
                    question: 'alskfjaosfasjflasj',
                    answer: 'asdlfjasdofisadjflj',
                    isDeleted: false,
                    _id: null,
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T13:09:17.535Z',
                updatedAt: '2025-04-02T13:10:42.029Z',
              },
              {
                _id: '67ee3882c4cefbdf640018kd',
                name: 'trail',
                segmentId: '67ebcc0bed786b75cfcd7164',
                description: 'trail',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'string',
                    answer: 'string',
                    isDeleted: false,
                    _id: '67ee3882c4cefbdf640018ke',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-03T07:28:02.657Z',
                updatedAt: '2025-04-03T07:28:02.657Z',
              },
            ],
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f85',
            value: 'speakingroom',
            label: 'Speaking Room',
            colorCode: '#f1ecff',
            createdAt: '2025-04-01T11:10:54.267Z',
            updatedAt: '2025-04-01T11:10:54.267Z',
          },
        ],
        status: 'active',
        createdAt: '2025-04-01T11:20:43.810Z',
        updatedAt: '2025-04-01T11:20:43.810Z',
      },
      {
        _id: '67ebcc0bed786b75cfcd7174',
        title: 'SEGMENT-8',
        category: [
          {
            _id: '67ebc9bdffdb1b6f21ac9f7c',
            value: 'classroom',
            label: 'Class Room',
            colorCode: '#47c747',
            createdAt: '2025-04-01T11:10:53.983Z',
            updatedAt: '2025-04-01T11:10:53.983Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f8f',
            value: 'selfpractice',
            label: 'Self-Practice',
            colorCode: '#f8f6bd',
            createdAt: '2025-04-01T11:10:54.079Z',
            updatedAt: '2025-04-01T11:10:54.079Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f83',
            value: 'practicewithmaster',
            label: 'Practice With Master',
            colorCode: '#c1dbe8',
            createdAt: '2025-04-01T11:10:54.173Z',
            updatedAt: '2025-04-01T11:10:54.173Z',
            subjects: [
              {
                _id: '67ec01a9f9ca16aa3577dckf',
                name: '1.1 Pronoun',
                segmentId: '67ebcc0bed786b75cfcd7174',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'Whats Your Name ?',
                    answer: 'Hi',
                    isDeleted: false,
                    _id: '67ec01a9f9ca16aa3577dcf0',
                  },
                  {
                    shortUrl: 'https://vimeo.com/2',
                    question: 'Whats Your Age ?',
                    answer: '22',
                    isDeleted: false,
                    _id: '67ec01a9f9ca16aa3577dcf1',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-01T15:09:29.945Z',
                updatedAt: '2025-04-01T15:09:29.945Z',
              },
              {
                _id: '67eccaef106167972fb11181',
                name: '1.2 Surface',
                segmentId: '67ebcc0bed786b75cfcd7174',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question: 'Test',
                    answer: 'Test',
                    isDeleted: false,
                    _id: '67eccaef106167972fb11182',
                  },
                  {
                    shortUrl: 'https://',
                    question: 'Test 2',
                    answer: 'Test 2',
                    isDeleted: false,
                    _id: '67eccaef106167972fb11183',
                  },
                  {
                    shortUrl: 'https://',
                    question: 'Test 3',
                    answer: 'Test 3',
                    isDeleted: false,
                    _id: '67ecdf386d68804f41434c84',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T05:28:15.945Z',
                updatedAt: '2025-04-02T06:54:48.359Z',
              },
              {
                _id: '67ed36fd04072134f7122fi0',
                name: '1.3 Pratice',
                segmentId: '67ebcc0bed786b75cfcd7174',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question:
                      'Whatasdlkfjsldfjldsafjdsalfjdsalfjdsa;fldsajfldsajf;ldsafdsalfjdsalfjdsaf',
                    answer: 'fdsalfkjsadflsaj;fdsajf;asjdf',
                    isDeleted: false,
                    _id: null,
                  },
                  {
                    shortUrl: 'https://',
                    question: 'alskfjaosfasjflasj',
                    answer: 'asdlfjasdofisadjflj',
                    isDeleted: false,
                    _id: null,
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T13:09:17.535Z',
                updatedAt: '2025-04-02T13:10:42.029Z',
              },
              {
                _id: '67ee3882c4cefbdf640018ld',
                name: 'trail',
                segmentId: '67ebcc0bed786b75cfcd7174',
                description: 'trail',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'string',
                    answer: 'string',
                    isDeleted: false,
                    _id: '67ee3882c4cefbdf640018le',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-03T07:28:02.657Z',
                updatedAt: '2025-04-03T07:28:02.657Z',
              },
            ],
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f95',
            value: 'speakingroom',
            label: 'Speaking Room',
            colorCode: '#f1ecff',
            createdAt: '2025-04-01T11:10:54.267Z',
            updatedAt: '2025-04-01T11:10:54.267Z',
          },
        ],
        status: 'active',
        createdAt: '2025-04-01T11:20:43.810Z',
        updatedAt: '2025-04-01T11:20:43.810Z',
      },
      {
        _id: '67ebcc0bed786b75cfcd7184',
        title: 'SEGMENT-9',
        category: [
          {
            _id: '67ebc9bdffdb1b6f21ac9f8c',
            value: 'classroom',
            label: 'Class Room',
            colorCode: '#47c747',
            createdAt: '2025-04-01T11:10:53.983Z',
            updatedAt: '2025-04-01T11:10:53.983Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f9f',
            value: 'selfpractice',
            label: 'Self-Practice',
            colorCode: '#f8f6bd',
            createdAt: '2025-04-01T11:10:54.079Z',
            updatedAt: '2025-04-01T11:10:54.079Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9f93',
            value: 'practicewithmaster',
            label: 'Practice With Master',
            colorCode: '#c1dbe8',
            createdAt: '2025-04-01T11:10:54.173Z',
            updatedAt: '2025-04-01T11:10:54.173Z',
            subjects: [
              {
                _id: '67ec01a9f9ca16aa3577dclf',
                name: '1.1 Pronoun',
                segmentId: '67ebcc0bed786b75cfcd7184',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'Whats Your Name ?',
                    answer: 'Hi',
                    isDeleted: false,
                    _id: '67ec01a9f9ca16aa3577dcg0',
                  },
                  {
                    shortUrl: 'https://vimeo.com/2',
                    question: 'Whats Your Age ?',
                    answer: '22',
                    isDeleted: false,
                    _id: '67ec01a9f9ca16aa3577dcg1',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-01T15:09:29.945Z',
                updatedAt: '2025-04-01T15:09:29.945Z',
              },
              {
                _id: '67eccaef106167972fb11191',
                name: '1.2 Surface',
                segmentId: '67ebcc0bed786b75cfcd7184',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question: 'Test',
                    answer: 'Test',
                    isDeleted: false,
                    _id: '67eccaef106167972fb11192',
                  },
                  {
                    shortUrl: 'https://',
                    question: 'Test 2',
                    answer: 'Test 2',
                    isDeleted: false,
                    _id: '67eccaef106167972fb11193',
                  },
                  {
                    shortUrl: 'https://',
                    question: 'Test 3',
                    answer: 'Test 3',
                    isDeleted: false,
                    _id: '67ecdf386d68804f41434c94',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T05:28:15.945Z',
                updatedAt: '2025-04-02T06:54:48.359Z',
              },
              {
                _id: '67ed36fd04072134f7122fj0',
                name: '1.3 Pratice',
                segmentId: '67ebcc0bed786b75cfcd7184',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question:
                      'Whatasdlkfjsldfjldsafjdsalfjdsalfjdsa;fldsajfldsajf;ldsafdsalfjdsalfjdsaf',
                    answer: 'fdsalfkjsadflsaj;fdsajf;asjdf',
                    isDeleted: false,
                    _id: null,
                  },
                  {
                    shortUrl: 'https://',
                    question: 'alskfjaosfasjflasj',
                    answer: 'asdlfjasdofisadjflj',
                    isDeleted: false,
                    _id: null,
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T13:09:17.535Z',
                updatedAt: '2025-04-02T13:10:42.029Z',
              },
              {
                _id: '67ee3882c4cefbdf640018md',
                name: 'trail',
                segmentId: '67ebcc0bed786b75cfcd7184',
                description: 'trail',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'string',
                    answer: 'string',
                    isDeleted: false,
                    _id: '67ee3882c4cefbdf640018le',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-03T07:28:02.657Z',
                updatedAt: '2025-04-03T07:28:02.657Z',
              },
            ],
          },
          {
            _id: '67ebc9beffdb1b6f21ac9g05',
            value: 'speakingroom',
            label: 'Speaking Room',
            colorCode: '#f1ecff',
            createdAt: '2025-04-01T11:10:54.267Z',
            updatedAt: '2025-04-01T11:10:54.267Z',
          },
        ],
        status: 'active',
        createdAt: '2025-04-01T11:20:43.810Z',
        updatedAt: '2025-04-01T11:20:43.810Z',
      },
      {
        _id: '67ebcc0bed786b75cfcd7194',
        title: 'SEGMENT-10',
        category: [
          {
            _id: '67ebc9bdffdb1b6f21ac9f9c',
            value: 'classroom',
            label: 'Class Room',
            colorCode: '#47c747',
            createdAt: '2025-04-01T11:10:53.983Z',
            updatedAt: '2025-04-01T11:10:53.983Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9g0f',
            value: 'selfpractice',
            label: 'Self-Practice',
            colorCode: '#f8f6bd',
            createdAt: '2025-04-01T11:10:54.079Z',
            updatedAt: '2025-04-01T11:10:54.079Z',
          },
          {
            _id: '67ebc9beffdb1b6f21ac9g03',
            value: 'practicewithmaster',
            label: 'Practice With Master',
            colorCode: '#c1dbe8',
            createdAt: '2025-04-01T11:10:54.173Z',
            updatedAt: '2025-04-01T11:10:54.173Z',
            subjects: [
              {
                _id: '67ec01a9f9ca16aa3577dcmf',
                name: '1.1 Pronoun',
                segmentId: '67ebcc0bed786b75cfcd7194',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'Whats Your Name ?',
                    answer: 'Hi',
                    isDeleted: false,
                    _id: '67ec01a9f9ca16aa3577dch0',
                  },
                  {
                    shortUrl: 'https://vimeo.com/2',
                    question: 'Whats Your Age ?',
                    answer: '22',
                    isDeleted: false,
                    _id: '67ec01a9f9ca16aa3577dch1',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-01T15:09:29.945Z',
                updatedAt: '2025-04-01T15:09:29.945Z',
              },
              {
                _id: '67eccaef106167972fb11201',
                name: '1.2 Surface',
                segmentId: '67ebcc0bed786b75cfcd7194',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question: 'Test',
                    answer: 'Test',
                    isDeleted: false,
                    _id: '67eccaef106167972fb11202',
                  },
                  {
                    shortUrl: 'https://',
                    question: 'Test 2',
                    answer: 'Test 2',
                    isDeleted: false,
                    _id: '67eccaef106167972fb11203',
                  },
                  {
                    shortUrl: 'https://',
                    question: 'Test 3',
                    answer: 'Test 3',
                    isDeleted: false,
                    _id: '67ecdf386d68804f41434d04',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T05:28:15.945Z',
                updatedAt: '2025-04-02T06:54:48.359Z',
              },
              {
                _id: '67ed36fd04072134f7122fk0',
                name: '1.3 Pratice',
                segmentId: '67ebcc0bed786b75cfcd7194',
                videoUrl: 'https://',
                shorts: [
                  {
                    shortUrl: 'https://',
                    question:
                      'Whatasdlkfjsldfjldsafjdsalfjdsalfjdsa;fldsajfldsajf;ldsafdsalfjdsalfjdsaf',
                    answer: 'fdsalfkjsadflsaj;fdsajf;asjdf',
                    isDeleted: false,
                    _id: null,
                  },
                  {
                    shortUrl: 'https://',
                    question: 'alskfjaosfasjflasj',
                    answer: 'asdlfjasdofisadjflj',
                    isDeleted: false,
                    _id: null,
                  },
                ],
                status: 'active',
                createdAt: '2025-04-02T13:09:17.535Z',
                updatedAt: '2025-04-02T13:10:42.029Z',
              },
              {
                _id: '67ee3882c4cefbdf640018nd',
                name: 'trail',
                segmentId: '67ebcc0bed786b75cfcd7194',
                description: 'trail',
                videoUrl: 'https://vimeo.com',
                shorts: [
                  {
                    shortUrl: 'https://vimeo.com',
                    question: 'string',
                    answer: 'string',
                    isDeleted: false,
                    _id: '67ee3882c4cefbdf640018me',
                  },
                ],
                status: 'active',
                createdAt: '2025-04-03T07:28:02.657Z',
                updatedAt: '2025-04-03T07:28:02.657Z',
              },
            ],
          },
          {
            _id: '67ebc9beffdb1b6f21ac9g15',
            value: 'speakingroom',
            label: 'Speaking Room',
            colorCode: '#f1ecff',
            createdAt: '2025-04-01T11:10:54.267Z',
            updatedAt: '2025-04-01T11:10:54.267Z',
          },
        ],
        status: 'active',
        createdAt: '2025-04-01T11:20:43.810Z',
        updatedAt: '2025-04-01T11:20:43.810Z',
      },
    ];
  }

  ngOnInit() {
    // this.fetchSegments();
    this.activeSegmentId = '67ebcc02ed786b75cfcd711e';
    this.onSegmentClick(this.activeSegmentId);

    this.activeSubMenuId = '67ebc9beffdb1b6f21ac9f32';
    this.activeSubSubMenuId = '67ecebfc04072134f7122ec1';
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
    this.activeSubMenuId = ''; // Reset submenus
    this.activeSubSubMenuId = ''; // Reset sub-submenus
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
    console.log('subSubMenu::', subSubMenu);
    console.log('subMenu::', subMenu);
    this.selectedCategory.emit(subMenu);
    this.selectedSubject.emit(subSubMenu);
    this.commonService.setSubject(subSubMenu);
    this.router.navigate([`/segments/${subMenu.value}`]);
  }

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

  fetchSegments() {
    this.segmentservice.getSegmentList().subscribe(
      (response: any) => {
        if (response.meta.code === 200) {
          this.segmentlist = this.sortData(response.data);
          if (this.segmentlist.length > 0) {
            // this.segmentId = this.segmentlist[2]._id;
            this.activeSegmentId = this.segmentlist[2]._id;
            this.onSegmentClick(this.activeSegmentId);
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
      // this.selectedSegment = foundSegment;
      this.selectedSegment.emit(foundSegment);
      this.selectedCategory.emit(foundSegment.category[2]);
      this.selectedSubject.emit(foundSegment.category[2].subjects[0]);
      console.log('foundedone::', this.selectedSegment);
    } else {
      console.error('Segment not found');
    }
  }
}
