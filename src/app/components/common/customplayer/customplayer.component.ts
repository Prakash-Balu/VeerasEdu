import { AfterViewInit, Component, ElementRef, Input, ViewChildren } from '@angular/core';
import Player from '@vimeo/player';

@Component({
  selector: 'app-customplayer',
  standalone: true,
  imports: [],
  templateUrl: './customplayer.component.html',
  styleUrl: './customplayer.component.css'
})
export class CustomplayerComponent implements AfterViewInit {
  @Input() videoId!: number; // Video ID input
  @Input() playerContainerRef!: any; // Reference to the container element

  ngAfterViewInit(): void {
      console.log(this.videoId);
      const options = {
        id: this.videoId,
        width: 260,
        height:144,
        loop: true,
        controls: true, // Hide default controls
        dnt: true, // Disable tracking
        byline: false, // Hide byline
        portrait: false, // Hide portrait
        title: false // Hide title
      }; 
      const player = new Player(this.playerContainerRef.nativeElement, options);
  }
}
