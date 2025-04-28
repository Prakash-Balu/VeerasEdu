import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./segments.component').then((m) => m.SegmentsComponent),
    children: [
      {
        path: ':segmentId/practice-with-master',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./practice-with-master/practice-with-master.module').then(
            (m) => m.PracticeWithMasterComponentModule
          ),
      },
      {
        path: ':segmentId/self-practice',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./self-practice-v2/self-practice-v2.module').then(
            (m) => m.SelfPracticeModule
          ),
      },
      {
        path: 'classroom',
        // canActivate: [AuthGuard],
        loadComponent: () =>
          import('./classroom/classroom.component').then(
            (m) => m.ClassroomComponent
          ),
        data: { showFooter: false, isMobile: false, page: 'Class Room' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegmentsRoutingModule {}
