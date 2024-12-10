import { CommonModule } from "@angular/common";
import { Component, ElementRef, ViewChild } from "@angular/core";
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

@Component({
  selector: "app-practice-with-master",
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: "./practice-with-master.component.html",
  styleUrl: "./practice-with-master.component.css",
})
export class PracticeWithMasterComponent {
  faArrowCircleLeft = faArrowCircleLeft;
  faCircleArrowLeft = faCircleArrowLeft;
  faArrowLeft = faArrowLeft;
  faMicrophone = faMicrophone;
  faBell = faBell;
  faTimes = faTimes;
  faBars = faBars;
  isSidebarVisible: boolean = false;
  @ViewChild("vimeoPlayer") vimeoPlayerElement!: ElementRef;
  player!: Player;
  videoId: number = 1019160112;
  //don't delete this//
  //1017352356 payment-mode
  //1017352427 sample-video
  //1017352439 demo-1
  //don't delete this//

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  segmentlist = [
    "INDEX",
    "SEGMENT 1- 10",
    "SEGMENT 1",
    "SEGMENT 2",
    "SEGMENT 3",
    "SEGMENT 4",
    "SEGMENT 5",
    "SEGMENT 6",
    "SEGMENT 7",
    "SEGMENT 8",
    "SEGMENT 9",
    "SEGMENT 10",
    "SEGMENT 11- 20",
    "SEGMENT 11",
    "SEGMENT 12",
    "SEGMENT 13",
    "SEGMENT 14",
    "SEGMENT 15",
  ];

  getSegmentClass(segment: string) {
    if (segment === "INDEX") {
      return "index-heading";
    } else if (segment.includes("SEGMENT") && segment.includes("-")) {
      return "segment-parent";
    } else {
      return "segment-child";
    }
  }

  ngAfterViewInit() {
    this.initializePlayer();
  }

  initializePlayer() {
    const options = {
      id: this.videoId,
      width: 1000,
      loop: false,
      title: false,
      byline: false,
      portrait: false,
      dnt: true,
      transparent: false,
    };

    this.player = new Player(this.vimeoPlayerElement.nativeElement, options);

    this.player.on("play", () => {
      console.log("Video played!");
    });
  }
}
