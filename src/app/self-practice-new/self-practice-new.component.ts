import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-self-practice-new',
  standalone:true,
  imports:[RouterModule ],
  templateUrl: './self-practice-new.component.html',
  styleUrl: './self-practice-new.component.css'
})
export class SelfPracticeNewComponent {
  constructor(){
    console.log("Self Practice New Loaded !");
  }
}
