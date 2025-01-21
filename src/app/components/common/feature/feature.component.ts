import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import Player from '@vimeo/player';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements AfterViewInit {

  public classroom: string = '';
  public videoIds: number[] = [1019160112,1019160112,1019160112];
  @ViewChildren('vimeoPlayerContainer') vimeoPlayerContainers!: QueryList<ElementRef>;
  public isPlayerLoaded: boolean[] = [];
  public players:any[] = [];
  public cards:any = [
    {
      title:'Class Room',
      content:'In class, you will learn what spoken Hindi is and how sentences are formed.',
      thumbnail:'assets/images/cardsimg/vcard.png',
      link:'/new-classroom'
    },
    {
      title:'Self Practice',
      content:'Learn and Grow at your own pace',
      thumbnail:'assets/images/cardsimg/vcard.png',
      link:'/self-practice'
    },
    {
      title:'Speaking Room',
      content:'Practice with Co-learners along with the Master on our great platform',
      thumbnail:'assets/images/cardsimg/vcard.png',
      link:'/practice-with-the-master'
    },
  ];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    const currentUrl = this.router.url;
    this.classroom = currentUrl.includes('home') ? 'new-classroom' : 'class-room';
    this.isPlayerLoaded = Array(this.videoIds.length).fill(false); // Initialize player load states
  }

  ngAfterViewInit(): void {
    this.vimeoPlayerContainers.forEach((container, index) => {
      const options = {
        id: this.videoIds[index],
        width: 260,
        height:144,
        loop: true,
        controls: false, // Hide default controls
        dnt: true, // Disable tracking
        byline: false, // Hide byline
        portrait: false, // Hide portrait
        title: false // Hide title
      }; 
      const player = new Player(container.nativeElement, options);
      player.on('play', () => {
        this.pauseAllExcept(player);
      });
      this.players.push(player);
    });
  }

  pauseAllExcept(currentPlayer: Player): void {
    this.players.forEach((player,index) => {
      if (player !== currentPlayer) {
        this.isPlayerLoaded[index] = false;
        player.pause().catch((err:any) => {
          console.error('Error pausing player:', err);
        });
      }
    });
  }

  loadPlayer(index: number): void {
    this.isPlayerLoaded[index] = !this.isPlayerLoaded[index];
    const player = this.players.at(index);
    player.play().catch((error:any) => {
      console.error('Error playing the video:', error);
    });
  }
}
