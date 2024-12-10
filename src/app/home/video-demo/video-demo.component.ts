import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { UtilsService } from '../../core/services/utils.service';
import Player from '@vimeo/player';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-video-demo',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './video-demo.component.html',
  styleUrl: './video-demo.component.css'
})
export class VideoDemoComponent implements OnInit, AfterViewInit {
  videPageVeeraImage!:SafeHtml;
  isVideoPlaying: boolean = false;
  @ViewChild('vimeoPlayer') vimeoPlayerElement!: ElementRef;
  player!: Player;
  videoId: number = 1019159531;
  
  constructor(
    private utilsService: UtilsService
  ){}

  ngOnInit(): void {
    this.videPageVeeraImage = this.utilsService.videPageVeeraImage()
  }

  ngAfterViewInit() {
    this.initializePlayer();
  }

  initializePlayer() {
    const options = {
      id: this.videoId,
      width: 500, 
      loop: false,
      title: false,         
      byline: false,        
      portrait: false,
      dnt: true,            
      transparent: false,
    };

    this.player = new Player(this.vimeoPlayerElement.nativeElement, options);

    this.player.on('play', () => {
      console.log('Video played!');
    });
  }

  onClickPlayPause() {
    if (this.isVideoPlaying) {
      this.player.pause().then(() => {
        this.isVideoPlaying = false; // Update state
      }).catch(error => {
        console.error('Error pausing the video:', error);
      });
    } else {
      this.player.play().then(() => {
        this.isVideoPlaying = true; // Update state
      }).catch(error => {
        console.error('Error playing the video:', error);
      });
    }
  }
}