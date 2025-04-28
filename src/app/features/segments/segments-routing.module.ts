import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./segments.component').then((m) => m.SegmentsComponent),
    children: [
      {
        path: 'classroom',
        // canActivate: [AuthGuard],
        loadComponent: () =>
          import('../classroom/classroom.component').then(
            (m) => m.ClassroomComponent
          ),
        data: { showFooter: false, isMobile: false, page: 'Class Room' },
      },
      {
        path: 'selfpracticenew',
        loadComponent: () =>
          import('../self-practice-v2/self-practice-v2.component').then(
            (m) => m.SelfPracticeV2Component
          ),
        data: { showFooter: false, isMobile: false, page: 'Self-Practice-New' },
      },
      {
        path: 'practicewithmaster',
        loadComponent: () =>
          import('../practice-with-master/practice-with-master.component').then(
            (m) => m.PracticeWithMasterComponent
          ),
        data: {
          showFooter: false,
          isMobile: false,
          page: 'Practice With Master',
        },
      },
      {
        path: 'swarmify',
        loadComponent: () =>
          import(
            '../practice-with-master/swarmify-player/swarmify-player.component'
          ).then((m) => m.SwarmifyPlayerComponent),
        data: { showFooter: false, isMobile: false, page: 'Self-Practice-New' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegmentsRoutingModule {}
