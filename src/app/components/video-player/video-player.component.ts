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
import { CommentsComponent } from '../common/comments/comments.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-player',
  standalone: true,
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
  imports: [CommentsComponent, CommonModule],
})
export class VideoPlayerComponent implements AfterViewInit, OnChanges {
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
