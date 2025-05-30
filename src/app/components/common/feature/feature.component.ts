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
  public videoIds: number[] = [1019160112,1019160112,1019160112,1019160112];
  @ViewChildren('vimeoPlayerContainer') vimeoPlayerContainers!: QueryList<ElementRef>;
  public isPlayerLoaded: boolean[] = [];
  public players:any[] = [];
  public cards:any = [];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    const currentUrl = this.router.url;
    // this.classroom = currentUrl.includes('home') ? 'segments/classroom' : 'class-room';
    this.isPlayerLoaded = Array(this.videoIds.length).fill(false); // Initialize player load states


    this.classroom = 'segments/practicewithmaster'; //Link
    this.cards = [
      {
        title:'Class Room',
        content:'In class, you will learn what spoken Hindi is and how sentences are formed.',
        thumbnail:'assets/images/cardsimg/thumb1.jpeg',
        link:'/' + this.classroom
      },
      {
        title:'Self Practice',
        content:'Learn and Grow at your own pace',
        thumbnail:'assets/images/cardsimg/thumb1.jpeg',
        link:'/self-practice-new'
      },
      {
        title:'Speaking Room',
        content:'Practice with Co-learners along with the Master on our great platform',
        thumbnail:'assets/images/cardsimg/thumb2.jpeg',
        link:'/speakingroom'
      },
      {
        title:'Practice With Master',
        content:'Practice  with the Master on our great platform',
        thumbnail:'assets/images/cardsimg/thumb2.jpeg',
        link:'segments/practicewithmaster'
      },
    ];
  }

  ngAfterViewInit(): void {
    this.vimeoPlayerContainers.forEach((container, index) => {
      const options = {
        id: this.videoIds[index],
        width: 295,
        height:144,
        loop: false,
        controls: false, // Hide default controls
        dnt: true, // Disable tracking
        byline: false, // Hide byline
        portrait: false, // Hide portrait
        title: false, // Hide title,
        vimeo_logo:false,
        play_button_position:'center',
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

  async loadPlayer(index: number): Promise<void> {
    this.isPlayerLoaded[index] = !this.isPlayerLoaded[index];
    const player:Player = this.players.at(index);
    const isPaused = await player.getPaused();
    if(isPaused){
      player.play().catch((error:any) => {
        console.error('Error playing the video:', error);
      });
    }else{
      player.pause().catch((error:any)=>{
        console.error('Error when pausing the video:',error);
      });
    }
  }
}
