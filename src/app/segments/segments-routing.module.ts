import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./segments.component').then((m) => m.SegmentsComponent),
    children: [
      {
        path: 'classroom',
            // canActivate: [AuthGuard],
        loadComponent: () => import('../classroom/classroom.component').then((m) => m.ClassroomComponent),
        data: { showFooter: false, isMobile: false, page: 'Class Room' },
      },
      {
        path: 'selfpractice',
        loadComponent: () => import('../self-pratice/self-pratice.component').then((m) => m.SelfPraticeComponent),
        data: { showFooter: false, isMobile: false, page: 'Self-Practice' },
      },
      {
        path: 'selfpracticenew',
        loadComponent: () => import('../self-practice-v2/self-practice-v2.component').then((m) => m.SelfPracticeV2Component),
        data: { showFooter: false, isMobile: false, page: 'Self-Practice-New' },
      },
      {
        path: 'practicewithmaster',
        loadComponent: () => import('../practice-with-master/practice-with-master.component').then((m) => m.PracticeWithMasterComponent),
        data: { showFooter: false, isMobile: false, page: 'Practice With Master' },
      },
      // {
      //   path: 'speakingroom',
      //   loadComponent: () => import('../speaking-room/speaking-room.component').then((m) => m.SpeakingRoomComponent),
      //   data: { showFooter: false, isMobile: false, page: 'Speaking Room' },
      // }
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegmentsRoutingModule { }
