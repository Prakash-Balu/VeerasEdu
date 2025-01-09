import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent {
  
  public classroom:string = '';

  constructor(private router: Router) {
    const currentUrl = this.router.url;
    if (currentUrl.includes('home')) {
      this.classroom = 'new-classroom';
    } else {
      this.classroom = 'class-room';
    }
  }
}
