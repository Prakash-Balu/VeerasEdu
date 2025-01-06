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
        // canActivate: [AuthGuard],
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
      {
        path: 'practice-with-the-master',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./practice-with-master/practice-with-master.component').then(
            (m) => m.PracticeWithMasterComponent
          ),
        data: { showFooter: false, isMobile: false, page: 'practice' },
      },
      {
        path: 'self-practice',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./segments/segments.component').then(
            (m) => m.SegmentsComponent
          ),
        data: { showFooter: false, isMobile: false, page: 'self' },
      },
      {
        path: 'class-room',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./segments/segments.component').then(
            (m) => m.SegmentsComponent
          ),
        data: { showFooter: false, isMobile: false, page: 'classroom' },
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
        path: 'checkout/:id',
        // canActivate: [AuthGuard],
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
