import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfPracticeNewComponent } from './self-practice-new.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SelfPracticeRoutingModule } from './self-practice-routing.module';
import { Type1Component } from './type1/type1.component';
import { Type2Component } from './type2/type2.component';


@NgModule({
  declarations: [
    SelfPracticeNewComponent,
    Type1Component,
    Type2Component,
  ],
  imports: [
    CommonModule,
    RouterModule,RouterOutlet,
    SelfPracticeRoutingModule,
    
  ]
})
export class SelfPracticeNewModule { }
