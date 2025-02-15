import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { similarityPercentage } from '../../core/utils/compare';

export interface ExerciseQuestion {
  q_id: number,
  title: string,
  ex_no: number,
  tamil: string,
  english: string,
  hindi: string,
  answers: string[]
}

export interface Exercise {
  _id: string,
  title: string,
  ex_no: number,
  questions: ExerciseQuestion[]
}

@Component({
  selector: 'app-type2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './type2.component.html',
  styleUrl: './type2.component.css'
})
export class Type2Component implements OnInit {

  public exerciseForm!: FormGroup;
  public pageIndex: number = 0;
  public recognition: any;
  public mediaRecorder: MediaRecorder | null = null;
  public audioChunks: Blob[] = [];
  public transcription: string = '';
  public audioBlob!: Blob;
  public audioURL!: string;
  public currentControl: FormControl | null = null;
  public currentQuestion: number = 0;
  public currentDash: any;

  @ViewChildren('inputElem') inputElements!: QueryList<ElementRef>;

  public exercise: Exercise = {
    _id: '12345',
    title: 'Exercise 1',
    ex_no: 1,
    questions: [
      {
        q_id: 123456,
        title: 'Exercise 1.1',
        ex_no: 1.1,
        tamil: 'எங்கள் Company Cominatore ல் இருக்கிறது',
        english: 'Our Company is in Coimbatore',
        hindi: '{{}} Company coimbatore {{}} {{}}',
        answers: ['Hamara', 'Company', 'coimbatore', 'mein', 'hai']
      },
      {
        q_id: 123457,
        title: 'Exercise 1.2',
        ex_no: 1.2,
        tamil: 'நான் ஒரு வெப் டெவலப்பர்',
        english: 'i am a web developer',
        hindi: '{{}} {{}} web developer',
        answers: ['main', 'ek ', 'web', 'developer']
      },
    ]
  };

  ngOnInit(): void {
    this.exerciseForm = this.fb.group({
      title: [this.exercise.title],
      ex_no: [this.exercise.ex_no],
      questions: this.generateQuestions()
    });
    console.log(this.exerciseForm.value);
  }

  public generateAnswers(answers: string[]): FormArray {
    const formArray = this.fb.array([]);
    answers.forEach((ans: string) => {
      formArray.push(this.fb.control(ans));
    });
    return formArray as FormArray;
  }

  public generateBlanks(answers: string[], hindi: string): FormArray {
    const formArray = this.fb.array([]);
    const hindiArr = hindi.split(' ');
    hindiArr.forEach((part: string, i: number) => {
      if (part === '{{}}') {
        formArray.push(this.fb.control('', Validators.required));
      } else {
        formArray.push(this.fb.control({ value: answers[i], disabled: true }));
      }
    });
    return formArray as FormArray;
  }

  public generateAns(hindi: string): FormArray {
    const formArray = this.fb.array([]);
    const hindiArr = hindi.split(' ');
    hindiArr.forEach((part: string, i: number) => {
      if (part === '{{}}') {
        formArray.push(this.fb.control(false));
      } else {
        formArray.push(this.fb.control(true));
      }
    })
    return formArray as FormArray;
  }

  public generateQuestions(): FormArray<FormGroup> {
    const questions = this.fb.array<FormGroup>([]);
    this.exercise.questions.forEach((item: ExerciseQuestion) => {
      const question = this.fb.group({
        q_id: item.q_id,
        tamil: item.tamil,
        english: item.english,
        hindi: item.hindi,
        ex_no: item.ex_no,
        answers: this.generateAnswers(item.answers),
        blanks: this.generateBlanks(item.answers, item.hindi),
        correct: this.generateAns(item.hindi),
        show: false,
        numOfAttempts: 0
      });
      questions.push(question);
    });
    return questions;
  }

  get questions(): FormArray<FormGroup> {
    return this.exerciseForm.get('questions') as FormArray<FormGroup>;
  }

  public getNotBlanks(i: number): number[] {
    const hindi: string = this.questions.at(i).get('hindi')?.value;
    const hindiArr: string[] = hindi.split(' ') || [];
    const notBlanks = hindiArr.map((part, index) => part !== '{{}}' ? index : -1).filter(index => index !== -1);
    console.log(notBlanks);
    return notBlanks;
  }

  public getIsCorrect(i: number, j: number): boolean {
    const q = this.questions.at(i).get('correct') as FormArray;
    return q.controls.at(j)?.value;
  }

  public getQuestionForm(i: number): FormGroup {
    return this.questions.at(i) as FormGroup;
  }

  public getBlanks(i: number): FormArray<FormControl> {
    return this.questions.at(i).get('answers') as FormArray<FormControl>;
  }

  public getAnswers(i: number): FormArray<FormControl> {
    return this.questions.at(i).get('blanks') as FormArray<FormControl>;
  }

  public getControl(i: number, j: number): FormControl {
    const blanks = this.questions.at(i).get('blanks') as FormArray;
    return blanks.at(j) as FormControl;
  }

  public getPlaceHolder(i: number, j: number): boolean {
    return !(i === this.currentQuestion && j === this.currentDash)
  }

  public isAllCorrect(): boolean {
    const question = this.questions.at(this.pageIndex);
    const correct: boolean[] = question.get('correct')?.value || [];
    return correct.every((val) => val === true);
  }

  public nextPage(): void {
    const allcorrect = this.isAllCorrect();
    if (this.pageIndex < this.exercise.questions.length - 1 && allcorrect) {
      this.pageIndex++;
      this.stopRecognition();
    }
  }

  public toggleAns(i: number): void {
    const q = this.questions.at(i);
    const show = q.get('show')?.value;
    q.get('show')?.setValue(!show);

    const answers = this.getBlanks(i).value;
    const blanks = q.get('blanks') as FormArray;

    blanks.controls.map((ctrl, index: number) => {
      ctrl.setValue(answers[index]);
      ctrl.disable();
    })

    const correct = this.questions.at(i).get('correct') as FormArray;
    correct.controls.map((ctrl) => {
      this.ngZone.run(() => {
        ctrl.setValue(true);
      });
    });
  }

  public retry(i: number): void {
    const q = this.questions.at(i);
    const hindi: string = q.get('hindi')?.value || '';
    const hindiArr = hindi.split(' ');
    const blanks = q.get('blanks') as FormArray;
    const answers: string[] = q.get('answers')?.value || [];
    const correct = q.get('correct') as FormArray;
    blanks?.reset();
    hindiArr.forEach((part: string, j: number) => {
      if (part !== '{{}}') {
        blanks.controls.at(j)?.setValue(answers[j]);
        correct.controls.at(j)?.setValue(true);
      } else {
        correct.controls.at(j)?.setValue(false);
      }
    });

    blanks.controls.map((ctrl, index: number) => {
      ctrl.enable();
    })
    this.stopRecognition();
  }


  focusInput(index: number) {
    console.log(index);
    console.log("Focus Input :",this.inputElements.toArray());
    setTimeout(() => {
      if (this.inputElements && this.inputElements.toArray()[index]) {
        this.inputElements.toArray()[index].nativeElement.focus();
      }
    }, 0);
  }

  public verify() {
    let i = this.currentQuestion;
    let j = this.currentDash;
    const input = this.currentControl?.value;
    const answers: string[] = this.questions.at(i).get('answers')?.value;
    const ans: string = answers.at(j) || '';
    const percenatge: number = similarityPercentage(input, ans, 'soundex');
    const result: boolean = percenatge >= 50;

    const hindi: string = this.questions.at(this.currentQuestion).get('hindi')?.value || '';
    const blankIndices = hindi.split(' ').map((part, index) => part === '{{}}' ? index : -1).filter(index => index !== -1);
    const q = this.questions.at(i).get('correct') as FormArray;

    if (result) {
      q.controls.at(j)?.setValue(result);
      this.currentControl?.setValue(answers[j]);
      const nextIndex = blankIndices[blankIndices.indexOf(this.currentDash) + 1];
      if (nextIndex !== undefined) {
        setTimeout(() => {
          this.transcription = ''; // Clear the transcription data
          this.getControl(i, this.currentDash).disable(); // Disable the previous control
          this.currentDash = nextIndex;
          this.currentControl = this.getControl(i, this.currentDash);
          this.focusInput(this.currentDash);
        }, 2000); // 2 seconds delay
      }
    }

    console.log(this.questions.value);
  }

  public startRecording() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          // Initialize MediaRecorder
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (event) => {
            this.audioChunks.push(event.data);
          };

          mediaRecorder.onstop = () => {
            this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
            this.audioURL = URL.createObjectURL(this.audioBlob);
            this.audioChunks = [];
            console.log('Audio recorded successfully.');
          };

          mediaRecorder.start();
          this.mediaRecorder = mediaRecorder;

          console.log('Recording started.');
        })
        .catch((error) => {
          console.error('Error accessing microphone:', error);
        });
    } else {
      console.error('getUserMedia is not supported in this browser.');
    }
  }

  public stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
  }

  public startRecognition(i: number, j: number): void {
    this.currentControl = this.getControl(i, j);
    this.currentQuestion = i;
    this.currentDash = j;
    if (this.currentControl) {
      const controlElement = document.getElementById(`control-${i}-${j}`);
      if (controlElement) {
        controlElement.classList.add('speak');
      }
    }
    if (this.recognition) {
      this.recognition.start();
    }
  }

  public stopRecognition(): void {
    if (this.recognition) {
      this.recognition.stop();
      console.log("Recognition stopped");
    }
    if (this.currentControl) {
      const controlElement = document.getElementById(`control-${this.pageIndex}-${this.currentControl}`);
      if (controlElement) {
        controlElement.classList.remove('speak');
      }
    }
  }

  constructor(private fb: FormBuilder, private ngZone: NgZone) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false; // Enable interim results for real-time feedback
      this.recognition.continuous = true;

      this.recognition.onerror = (error: any) => {
        console.error('SpeechRecognition error:', error);
      };

      this.recognition.onend = () => {
        this.currentControl?.setValue('');
        this.currentControl?.markAsTouched();
        this.currentControl?.updateValueAndValidity();
        const controlElement = document.getElementById(`control-${this.pageIndex}-${this.currentDash}`);
        if (controlElement) {
          controlElement.blur();
        }
        console.log('SpeechRecognition ended.');
      };

      this.recognition.onresult = (event: any) => {
        const latestResultIndex = event.results.length - 1;
        const latestTranscript = event.results[latestResultIndex][0].transcript;
        this.transcription = latestTranscript;
        this.ngZone.run(() => {
          if (this.currentControl) {
            this.currentControl.setValue(this.transcription);
            this.verify();
          }
        });
      };
    } else {
      console.error('SpeechRecognition is not supported in this browser.');
    }
  }
}
