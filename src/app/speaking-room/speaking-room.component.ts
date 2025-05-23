import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MaterialModule } from '../material-module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CallingComponent } from "./calling/calling.component";
import { CalldefaultComponent } from './calldefault/calldefault.component';

@Component({
  selector: 'app-speaking-room',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    RouterLink,
    MaterialModule,
    NgScrollbarModule,
    CallingComponent,
    CalldefaultComponent
],
  templateUrl: './speaking-room.component.html',
  styleUrl: './speaking-room.component.css',
})
export class SpeakingRoomComponent {
  constructor() {}

  ngOnInit() {}

  visible: boolean = true;
  hideDefaultcall() {
    this.visible = this.visible ? false : true;
  }

  isFavorite: boolean = false;
  clickEvent() {
    this.isFavorite = !this.isFavorite;
  }

  mobmenuactive: boolean = false;
  mobmenuactive_click() {
    this.mobmenuactive = !this.mobmenuactive;
  }
  chatlists = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  isMuted: boolean[] = [false, false, false];

  toggleMute(index: number): void {
    this.isMuted[index] = !this.isMuted[index];
  }
}
