import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./seg.component').then((m) => m.SegComponent),
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
        loadComponent: () => import('../selfv2/selfv2.component').then((m) => m.Selfv2Component),
        data: { showFooter: false, isMobile: false, page: 'Self-Practice-New' },
      },
      {
        path: 'practicewithmaster',
        loadComponent: () => import('../practice-with-master/practice-with-master.component').then((m) => m.PracticeWithMasterComponent),
        data: { showFooter: false, isMobile: false, page: 'Practice With Master' },
      },
      // {
      //   path: 'speakingroom'
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegRoutingModule { }
