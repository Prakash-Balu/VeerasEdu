import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-speech',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './speech.component.html',
  styleUrl: './speech.component.css'
})
export class SpeechComponent {
  fillupsForm: FormGroup;
  recognition: any;
  activeControl: string | null = null; // To track which input is active

  constructor() {
    this.fillupsForm = new FormGroup({
      blank1: new FormControl(''),
      blank2: new FormControl(''),
      blank3: new FormControl('')
    });
  }

  ngOnInit() {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US'; // Hindi language recognition
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        console.log('Recognized:', speechResult);

        // Fill the correct form control based on active field
        if (this.activeControl) {
          this.fillupsForm.patchValue({ [this.activeControl]: speechResult });
          this.activeControl = null; // Reset active control
        }
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
      };
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  }

  startRecognition(controlName: string) {
    this.activeControl = controlName; // Set active input field
    if (this.recognition) {
      this.recognition.start();
    }
  }
}
