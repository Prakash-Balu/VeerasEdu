import { Component, HostListener, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBrain,
  faArrowUp,
  faUser,
  faFile,
  faAddressCard,
  faGraduationCap,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { SafeHtml } from '@angular/platform-browser';
import { UtilsService } from '../core/services/utils.service';
import { FeatureComponent } from '../components/common/feature/feature.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FontAwesomeModule, FeatureComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  faBrain = faBrain;
  faArrowUp = faArrowUp;
  faFile = faFile;
  faUser = faUser;
  faAddressCard = faAddressCard;
  faGraduationCap = faGraduationCap;
  faBook = faBook;
  dashVeera!: SafeHtml;
  underlineIcon!: SafeHtml;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.dashVeera = this.utilsService.dashVeera();
    this.underlineIcon = this.utilsService.underlineIcon();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const button = document.getElementById('backToTop');
    if (window.pageYOffset > 200) {
      button?.classList.remove('hidden');
    } else {
      button?.classList.add('hidden');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
