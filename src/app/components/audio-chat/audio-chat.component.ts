import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-chat.component.html',
  styleUrl: './audio-chat.component.css'
})
export class AudioChatComponent implements OnInit, OnDestroy {

  private mediaRecorder!: MediaRecorder;
  private audioChunks: Blob[] = [];
  audioUrl: string | null = null;
  isRecording: boolean = false;
  @Output() audioRespBlob = new EventEmitter<any>();

  timer: string = '00:00';
  private timerInterval!: any;

  ngOnInit(): void {}

  // receiveAudioBlob(blob: Blob) { // Comments component method
  //   this.audioBlob = blob;
  //   console.log(this.audioBlob);
  //   // this.uploadAudio(this.audioBlob);
  // }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.mediaRecorder = new MediaRecorder(stream);
      this.audioUrl = null;
      this.audioChunks = [];
      this.isRecording = true;
      this.startTimer();

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.stopTimer();

      this.mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioUrl = URL.createObjectURL(audioBlob);
        this.audioRespBlob.emit(audioBlob);
        this.audioChunks = [];
        console.log(audioBlob);
        console.log(this.audioUrl);
       
      });
    }
  }

  private startTimer() {
    let seconds = 0;

    this.timerInterval = setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      this.timer = `${this.pad(mins)}:${this.pad(secs)}`;
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timer = '00:00';
  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}