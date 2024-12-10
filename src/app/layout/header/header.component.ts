import { Component, HostListener, OnInit } from '@angular/core';
import { MaterialModule } from '../../material-module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';
import { UtilsService } from '../../core/services/utils.service';
import { AuthService } from '../../core/services/auth.service';
import { SegmentService } from '../../core/services/segments.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isMenuOpen = true;
  isLogginRoute: boolean = false;
  isDashboard: boolean = true;
  isMobile: boolean = false;
  headerLogo!: SafeHtml;
  lockIcon!: SafeHtml;
  islogin: boolean = false;

  constructor(
    private router: Router,
    private utilsService: UtilsService,
    private authService: AuthService,
    private logoutService: SegmentService
  ) {
    this.router.events.subscribe(() => {
      this.isLogginRoute = this.router.url === '/home';
    });

    this.router.events.subscribe(() => {
      this.islogin = this.router.url === '/login';
    });
  }
  ngOnInit(): void {
    this.checkScreenSize();
    this.headerLogo = this.utilsService.headerLogo();
    this.lockIcon = this.utilsService.lockIcon();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const mobileWidth = 768;
    if (window.innerWidth <= mobileWidth) {
      this.isMobile = true;
      this.authService.setIsMobile('true');
    } else {
      this.isMobile = false;
      this.authService.setIsMobile('false');
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  logout() {
    this.logoutService.logout().subscribe(
      (response: any) => {
        if (response.meta.code === 200) {
          localStorage.clear();
          this.router.navigate(['/login']);
        } else {
          alert('Retry to logout...!');
        }
      },
      (error) => {
        console.log('error in login method::', error);
      }
    );
  }
}
