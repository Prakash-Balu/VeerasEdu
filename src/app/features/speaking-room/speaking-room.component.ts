import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MaterialModule } from '../../material-module';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-speaking-room',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterLink, MaterialModule, NgScrollbarModule],
  templateUrl: './speaking-room.component.html',
  styleUrl: './speaking-room.component.css',
})
export class SpeakingRoomComponent {
  faArrowLeft = faArrowLeft;
  users = [
    { name: 'Tamizh', lastActive: '20 Min Ago', callType: 'voice' },
    { name: 'Raja Raman', lastActive: '10 Min Ago', callType: 'voice' },
    { name: 'Thennarasu', lastActive: '30 Min Ago', callType: 'video' },
    { name: 'Prakash', lastActive: '40 Min Ago', callType: 'voice' },
  ];

  constructor() {}

  ngOnInit() {}

  isClassVisible = false;

  toggleClass(show: boolean) {
    this.isClassVisible =show; // Toggle the class visibility
  }

  isMuted: boolean[] = [false, false, false]; 

  toggleMute(index: number): void {
    this.isMuted[index] = !this.isMuted[index];
  }
}
