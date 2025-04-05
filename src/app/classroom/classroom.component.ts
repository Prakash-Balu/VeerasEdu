import { CommonModule } from "@angular/common";
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faArrowCircleLeft,
  faCircleArrowLeft,
  faBell,
  faArrowLeft,
  faMicrophone,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Player from "@vimeo/player";
import { CommentsComponent } from "../components/common/comments/comments.component";
import { VideoPlayerComponent } from "./video-player/video-player.component";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-classroom",
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, VideoPlayerComponent, RouterModule],
  templateUrl: "./classroom.component.html",
  styleUrl: "./classroom.component.css",
})
export class ClassroomComponent {
  // videoObj: any = {};
   @Input() videoObj: { video_url?: string, _id?: string } = {};
  
   constructor(private actRoute: ActivatedRoute, private router: Router) {
 
      console.log('Dynamic param:', this.actRoute.snapshot.data['selectedSub']);
      const nav = this.router.getCurrentNavigation();
      if (nav?.extras?.state) {
        const { data } = nav.extras.state;
        console.log('From router state:',data);
      }

   }
 
   
   ngOnInit() {
    
   }
}
