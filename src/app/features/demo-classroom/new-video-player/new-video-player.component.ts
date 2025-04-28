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
import { NewCommentsComponent } from '../new-comments/new-comments.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-video-player',
  standalone: true,
  imports: [NewCommentsComponent, CommonModule],
  templateUrl: './new-video-player.component.html',
  styleUrl: './new-video-player.component.css'
})
export class NewVideoPlayerComponent {
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
