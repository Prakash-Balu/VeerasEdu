import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ActivationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from '../preloader/preloader.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent,  RouterModule, CommonModule, PreloaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  isHideFooter: boolean = true;
  showHeader = false;
  isLoading: boolean = true;
  isPreloader: boolean = false;

  constructor(private router : Router) {
    this.router.events.subscribe(()=>{
      this.isHideFooter = this.router.url === "/login"
      this.isPreloader = this.router.url === "/home" // Preloader enable
      // if(this.router.url.includes('checkout')){
      //   this.showHeader = false;
      // }else{
      //   this.showHeader = true;
      // }

      // this.showHeader = this.router.url === "/checkout"
     
    })
  }

  ngOnInit() {
    // Simulate a loading delay (e.g., API calls, data fetching)
    setTimeout(() => {
      this.isLoading = false;
    }, 6500); // 6.5-second delay
  }

}
