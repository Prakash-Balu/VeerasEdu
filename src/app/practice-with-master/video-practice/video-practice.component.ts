import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-practice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-practice.component.html',
  styleUrl: './video-practice.component.css'
})
export class VideoPracticeComponent {
  @ViewChild('vimeoPlayer') vimeoPlayerElement!: ElementRef;

  @Input() videoObj: { video_url?: string, _id?: string } = {};
  sanitizedVideoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngAfterViewInit() {
    this.updateSanitizedVideoUrl();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoObj']) {
      this.updateSanitizedVideoUrl();
    }
  }

  private updateSanitizedVideoUrl() {
    if (this.videoObj.video_url) {
      const videoUrl = this.videoObj.video_url.replace(/&amp;/g, '&');
      this.sanitizedVideoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }
  }
}
