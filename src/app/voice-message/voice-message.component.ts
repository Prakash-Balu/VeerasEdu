import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-voice-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voice-message.component.html',
  styleUrl: './voice-message.component.css'
})
export class VoiceMessageComponent {
  isPlaying = false;

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    // Logic for actual audio play/pause can be added here
  }
}
