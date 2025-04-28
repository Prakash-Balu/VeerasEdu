import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./practice-with-master.component').then(
        (m) => m.PracticeWithMasterComponent
      ),
  },
  {
    path: ':subjectId',
    loadComponent: () =>
      import('./practice-with-master.component').then(
        (m) => m.PracticeWithMasterComponent
      ),
    data: {
      showFooter: false,
      isMobile: false,
      page: 'Practice With Master',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticeWithMastersRoutingModule {}
