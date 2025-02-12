import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { similarityPercentage } from '../../core/utils/compare';


export interface ExerciseQuestion{
  q_id:number,
  title:string,
  ex_no:number,
  tamil:string,
  english:string,
  hindi:string,
  answers:string[]
}

export interface Exercise{
  _id:string,
  title:string,
  ex_no:number,
  questions:ExerciseQuestion[]
}

@Component({
  selector: 'app-type2',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './type2.component.html',
  styleUrl: './type2.component.css'
})


export class Type2Component implements OnInit {
  
  public exerciseForm!:FormGroup;
  
  public pageIndex:number = 0;

  public recognition: any;
  public mediaRecorder: MediaRecorder | null = null;
  public audioChunks: Blob[] = [];
  public transcription: string = '';
  public audioBlob!: Blob;
  public audioURL!: string;
  public currentControl: FormControl | null = null;
  public currentQuestion:number = 0;


  public exercise:Exercise = {
    _id: '12345',
    title: 'Exercise 1',
    ex_no: 1,
    questions: [
      {
        q_id: 123456,
        title: 'Exercise 1.1',
        ex_no: 1.1,
        tamil: 'எங்களுடையா Company Cominatore ல் இருக்கிறது',
        english: 'Our Company is in Coimbatore',
        hindi:'{{}} Company coimbatore {{}} {{}}',
        answers: ['Hamara','Company','coimbatore','mein','hai']
      },
      {
        q_id: 123457,
        title: 'Exercise 1.2',
        ex_no: 1.2,
        tamil: 'நான் ஒரு வெப் டெவலப்பர்',
        english: 'i am a web developer',
        hindi:'{{}} {{}} web developer',
        answers: ['main','ek ','web','developer']
      },
    ]
  };
  currentDash: any;
  
  
  ngOnInit(): void {
    this.exerciseForm = this.fb.group({
      title:[this.exercise.title],
      ex_no:[this.exercise.ex_no],
      questions:this.generateQuestions()
    });
    console.log(this.exerciseForm.value);
  }

  public generateAnswers(answers:string[]):FormArray{
    const formArray = this.fb.array([]);
    answers.forEach((ans:string) => {
      formArray.push(this.fb.control(ans));
    });
    return formArray as FormArray;
  }

  public generateBlanks(answers:string[],hindi:string):FormArray{
    const formArray = this.fb.array([]);
    const hindiArr = hindi.split(' ');
    hindiArr.forEach((part:string,i:number)=>{
      if(part === '{{}}'){
        formArray.push(this.fb.control(''));
      }else{
        formArray.push(this.fb.control(answers[i]));
      }
    })
    return formArray as FormArray;
  }

  public generateAns(hindi:string):FormArray{
    const formArray = this.fb.array([]);
    const hindiArr = hindi.split(' ');
    hindiArr.forEach((part:string,i:number)=>{
      if(part === '{{}}'){
        formArray.push(this.fb.control(false));
      }else{
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
        hindi:item.hindi,
        ex_no: item.ex_no,
        answers: this.generateAnswers(item.answers),
        blanks: this.generateBlanks(item.answers,item.hindi),
        correct:this.generateAns(item.hindi),
        show:false
      });
      questions.push(question);
    });
    return questions;
  }

  get questions():FormArray<FormGroup>{
    return this.exerciseForm.get('questions') as FormArray<FormGroup>;
  }

  public getIsCorrect(i:number,j:number):boolean{
    const q = this.questions.at(i).get('correct') as FormArray;
    return q.controls.at(j)?.value;
  }

  public getQuestionForm(i:number):FormGroup{
    return this.questions.at(i) as FormGroup;
  }

  public getBlanks(i:number):FormArray<FormControl>{
    return this.questions.at(i).get('answers') as FormArray<FormControl>;
  }

  public getControl(i:number,j:number):FormControl{
    const blanks =  this.questions.at(i).get('blanks') as FormArray;
    return blanks.at(j) as FormControl;
  }

  public isAllCorrect():boolean{
    const question = this.questions.at(this.pageIndex);
    const correct:boolean[] = question.get('correct')?.value || [];
    return correct.every((val)=>val === true);
  }

  public nextPage():void{
    const allcorrect = this.isAllCorrect();
    if(this.pageIndex < this.exercise.questions.length-1 && allcorrect ){
      this.pageIndex++;
    }
  }

  public toggleAns(i:number){
    const q = this.questions.at(i)
    const show = q.get('show')?.value;
    q.get('show')?.setValue(!show);
  }

  public retry(i:number):void{
    const q = this.questions.at(i);
    const hindi:string = q.get('hindi')?.value || '';
    const hindiArr = hindi.split(' ');
    const blanks  = q.get('blanks') as FormArray;
    const answers:string[] = q.get('answers')?.value || [];
    const correct = q.get('correct') as FormArray;
    blanks?.reset();
    hindiArr.forEach((part:string,j:number)=>{
      if(part !== '{{}}'){
        blanks.controls.at(j)?.setValue(answers[j]);
        correct.controls.at(j)?.setValue(true);
      }else{
        correct.controls.at(j)?.setValue(false);
      }
    });
  }

  public check(i:number,j:number){
    const input = this.getControl(i,j).value;
    const answers:string[] = this.questions.at(i).get('answers')?.value;
    const ans:string = answers.at(j) || '';
    const levenshtein:number = similarityPercentage(input,ans,'levenshtein');
    const result:boolean = levenshtein > 60;
    const q = this.questions.at(i).get('correct') as FormArray;
    q.controls.at(j)?.setValue(result);
    console.log(q.value);
  }

  public verify(){
    let i = this.currentQuestion;
    let j = this.currentDash;
    const input = this.currentControl?.value;
    const answers:string[] = this.questions.at(i).get('answers')?.value;
    const ans:string = answers.at(j) || '';
    const levenshtein:number = similarityPercentage(input,ans,'levenshtein');
    const result:boolean = levenshtein > 60;
    const q = this.questions.at(i).get('correct') as FormArray;
    q.controls.at(j)?.setValue(result); 
    console.log(q);
  }


  public startRecording(){
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

  public stopRecording(){
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

  constructor(private fb:FormBuilder){
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = true; // Enable interim results for real-time feedback
      this.recognition.continuous = false;

      this.recognition.onerror = (error: any) => {
        this.currentControl?.setValue('Try in Hindi');
        console.error('SpeechRecognition error:', error);
      };

      this.recognition.onend = () => {
        console.log('SpeechRecognition ended.');
      };

      this.recognition.onresult = (event: any) => {
        const latestResultIndex = event.results.length - 1;
        const latestTranscript = event.results[latestResultIndex][0].transcript;

        this.transcription = latestTranscript;

        if (this.currentControl) {
          this.currentControl.setValue(latestTranscript);
          this.verify(); // Check the input in real-time
        }
      };
    } else {
      console.error('SpeechRecognition is not supported in this browser.');
    }
  }

}
