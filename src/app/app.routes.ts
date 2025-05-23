import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
        data: { showHeader: true, isMobile: true },
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
        data: { showFooter: false },
      },
      {
        path: 'attendence',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./attedence/attedence.component').then(
            (m) => m.attedenceComponent
          ),
        data: { showFooter: false, isMobile: false },
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: { showFooter: false, isMobile: false },
      },
      // {
      //   path: 'practice-with-the-master',
      //   // canActivate: [AuthGuard],
      //   loadComponent: () =>
      //     import('./practice-with-master/practice-with-master.component').then(
      //       (m) => m.PracticeWithMasterComponent
      //     ),
      //   data: { showFooter: false, isMobile: false, page: 'practice' },
      // },
      {
        path: 'practice-master',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./practice-master/practice-master.component').then(
            (m) => m.PracticeMasterComponent
          ),
        data: { showFooter: false, isMobile: false },
      },
      {
        path: 'practice-master/:name/:_id',
        // canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './practice-master/pratice-with-master-detail/pratice-with-master-detail.component'
          ).then((m) => m.PraticeWithMasterDetailComponent),
        data: { showFooter: false, isMobile: false },
      },

      {
        path: 'self-practice',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./self-pratice/self-pratice.component').then(
            (m) => m.SelfPraticeComponent
          ),
        data: { showFooter: false, isMobile: false, page: 'self' },
      },
      {
        path: 'self-practice-new',
        loadChildren: () =>
          import('./self-practice-new/self-practice-routing.module').then(
            (m) => m.SelfPracticeRoutingModule
          ),
      },
      // {
      //   path: 'self-practice-v2',
      //   loadComponent: () =>
      //     import('./self-practice-v2/self-practice-v2.component').then(
      //       (m) => m.SelfPracticeV2Component
      //     ),
      // },
      {
        path: 'segments',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./segments/segments.module').then((m) => m.SegmentsModule),
      },

      {
        path: 'seg',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./seg/seg.module').then((m) => m.SegModule),
      },
      {
        path: 'new-classroom',
        // canActivate: [AuthGuard],
        loadComponent: () =>
          import('./segment-new/segment-new.component').then(
            (m) => m.SegmentNewComponent
          ),
        data: { showFooter: false, isMobile: false, page: 'new-classroom' },
      },
      {
        path: 'demo-classroom',
        // canActivate: [AuthGuard],
        loadComponent: () =>
          import('./demo-classroom/demo-classroom.component').then(
            (m) => m.DemoClassroomComponent
          ),
        data: { showFooter: false, isMobile: false, page: 'Demo-classroom' },
      },
      {
        path: 'classrooms',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./segments/segments.component').then(
            (m) => m.SegmentsComponent
          ),
        data: { showFooter: false, isMobile: false, page: 'classroom' },
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
        data: { showFooter: false, showHeader: false, isMobile: false },
      },
      {
        path: 'payment-success',
        loadComponent: () =>
          import('./payment-success/payment-success.component').then(
            (m) => m.PaymentSuccessComponent
          ),
        data: { showFooter: false, showHeader: false, isMobile: false },
      },
      {
        path: 'payment-failure',
        loadComponent: () =>
          import('./payment-failure/payment-failure.component').then(
            (m) => m.PaymentFailureComponent
          ),
        data: { showFooter: false, showHeader: false, isMobile: false },
      },
      {
        path: 'speaking-room',
        loadComponent: () =>
          import('./speaking-room/speaking-room.component').then(
            (m) => m.SpeakingRoomComponent
          ),
        data: { showFooter: false, showHeader: false, isMobile: false },
      },
      {
        path: 'callconnected',
        loadComponent: () =>
          import('./speaking-room/callconnected/callconnected.component').then(
            (m) => m.CallconnectedComponent
          ),
        data: { showFooter: false, showHeader: false, isMobile: false },
      },
      {
        path: 'syllabus',
        loadComponent: () =>
          import('./speaking-room/syllabus/syllabus.component').then(
            (m) => m.SyllabusComponent
          ),
        data: { showFooter: false, showHeader: false, isMobile: false },
      },
    ],
  },
];

// {
//   path: "practice-with-the-master",
//   canActivate: [AuthGuard],
//   loadComponent: () =>
//     import("./practice-with-master/practice-with-master.component").then(
//       (m) => m.PracticeWithMasterComponent
//     ),
//   data: { showFooter: false, isMobile: false },
// },
// {
//   path: "self-practice",
//   canActivate: [AuthGuard],
//   loadComponent: () =>
//     import("./self-pratice/self-pratice.component").then(
//       (m) => m.SelfPraticeComponent
//     ),
//   data: { showFooter: false, isMobile: false },
// },
// {
//   path: "class-room",
//   loadComponent: () =>
//     import("./classroom/classroom.component").then(
//       (m) => m.ClassroomComponent
//     ),
//   data: { showFooter: false, isMobile: false },
// },
