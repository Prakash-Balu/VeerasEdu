import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FeatureComponent } from '../../components/common/feature/feature.component';
import { BannerComponent } from './banner/banner.component';
import { VideoDemoComponent } from './video-demo/video-demo.component';
import { JourneyComponent } from './journey/journey.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { AuthService } from '../../shared/services/auth.service';
import { NewPlansComponent } from './new-plans/new-plans.component';

interface User {
  firstname: string;
  lastname: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FeatureComponent,
    BannerComponent,
    VideoDemoComponent,
    JourneyComponent,
    NewPlansComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User | undefined;
  data: string = '';
  isBrowser: boolean;
  planDetails: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authSerive: AuthService
  ) {
    // console.log(authSerive.token);
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // if (this.isBrowser) {
    //   this.renderer.addClass(
    //     this.el.nativeElement.querySelector(".banner__content .title"), // I dont know class is not present
    //     "active"
    //   );
    //   setTimeout(() => {
    //     this.renderer.removeClass(
    //       this.el.nativeElement.querySelector(".banner__content .title"),
    //       "active"
    //     );
    //   }, 3000);
    //   window.addEventListener("scroll", this.onScroll.bind(this));
    // }
  }

  onScroll(): void {
    if (this.isBrowser) {
      const whatsappIcons =
        this.el.nativeElement.querySelectorAll('.footer_icon_float');
      whatsappIcons.forEach((icon: HTMLElement) => {
        if (window.scrollY > 120) {
          this.renderer.addClass(icon, 'active');
        } else {
          this.renderer.removeClass(icon, 'active');
        }
      });
    }
  }

  onVideoPlay(): void {
    if (this.isBrowser) {
      let videoFrame = this.el.nativeElement.querySelector('.video-frame');
      let videoThumb = this.el.nativeElement.querySelector('.video_inner');
      let video = videoFrame.querySelector('video');
      video.play();

      video.addEventListener('pause', (event: any) => {
        console.log('video pause');
        videoFrame.style.zIndex = 1;
        videoFrame.style.opacity = 0;
        videoThumb.style.opacity = 1;
      });
      video.addEventListener('play', (event: any) => {
        console.log('video play');
        videoFrame.style.zIndex = 5;
        videoFrame.style.opacity = 1;
        videoThumb.style.opacity = 0;
      });
    }
  }

  onHelpVideoPlay() {
    if (this.isBrowser) {
      let videoFrame = this.el.nativeElement.querySelector('.help_videoframe');
      let videoThumb = this.el.nativeElement.querySelector('.help_videothumb');
      let video = videoFrame.querySelector('video');
      let closeButton = this.el.nativeElement.querySelector('#closehelp_video');
      video.play();

      video.addEventListener('pause', (event: any) => {
        console.log('video pause');
        videoFrame.style.zIndex = 1;
        videoFrame.style.opacity = 0;
        videoThumb.style.opacity = 1;
      });
      video.addEventListener('play', (event: any) => {
        console.log('video play');
        videoFrame.style.zIndex = 5;
        videoFrame.style.opacity = 1;
        videoThumb.style.opacity = 0;
      });
      closeButton.addEventListener('click', () => {
        video.pause();
      });
    }
  }
}
