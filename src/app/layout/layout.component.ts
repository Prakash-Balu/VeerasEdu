import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ActivationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent,  RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  isHideFooter: boolean = true;
  showHeader = false;

  constructor(private router : Router) {
    this.router.events.subscribe(()=>{
      this.isHideFooter = this.router.url === "/login"
      // if(this.router.url.includes('checkout')){
      //   this.showHeader = false;
      // }else{
      //   this.showHeader = true;
      // }

      // this.showHeader = this.router.url === "/checkout"
     
    })
  }

}
