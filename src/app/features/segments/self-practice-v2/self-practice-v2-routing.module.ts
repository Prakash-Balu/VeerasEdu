import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./self-practice-v2.component').then(
        (m) => m.SelfPracticeV2Component
      ),
  },
  {
    path: ':subjectId',
    loadComponent: () =>
      import('./self-practice-v2.component').then(
        (m) => m.SelfPracticeV2Component
      ),
    data: { showFooter: false, isMobile: false, page: 'Self Practice' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfPracticeRoutingModule {}
