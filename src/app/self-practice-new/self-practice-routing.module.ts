import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfPracticeNewComponent } from './self-practice-new.component';
import { Type1Component } from './type1/type1.component';
import { Type2Component } from './type2/type2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpeechComponent } from './speech/speech.component';

const routes: Routes = [
  {
    path: '',
    component: SelfPracticeNewComponent,
    children: [
        { path: 'type-1', component: Type1Component },
        { path: 'type-2', component: Type2Component },
        {path:'speech',component:SpeechComponent},
        { path: '', redirectTo: 'type-2', pathMatch: 'full' },
    ],
  },
  // {
  //   path: "",
  //   loadComponent: () => 
  //     import('./self-practice-new.component').then(
  //       (m) => m.SelfPracticeNewComponent
  //     )
  //   },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule],
})
export class SelfPracticeRoutingModule {}
