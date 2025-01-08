import { CommonModule } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild,ViewEncapsulation  } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ExerciseService } from "../core/services/exercise.service";
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
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ReplaceBlanksPipe } from "../replace-blanks.pipe";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "app-self-pratice",
  standalone: true,
  imports: [FontAwesomeModule, CommonModule,ReactiveFormsModule,ReplaceBlanksPipe],
  templateUrl: "./self-pratice.component.html",
  styleUrl: "./self-pratice.component.css",
  providers:[ReplaceBlanksPipe],
  encapsulation: ViewEncapsulation.None // Disables view encapsulation
})
export class SelfPraticeComponent implements OnInit {
  faArrowCircleLeft = faArrowCircleLeft;
  faCircleArrowLeft = faCircleArrowLeft;
  faArrowLeft = faArrowLeft;
  faMicrophone = faMicrophone;
  faBell = faBell;
  faTimes = faTimes;
  faBars = faBars;
  isSidebarVisible: boolean = false;
  @ViewChild('vimeoPlayer') vimeoPlayerElement!: ElementRef;
  player!: Player;
  videoId: string = '';
  
  currentExerciseIndex = 0;
  form!:FormArray;
  final:any;

  exercises: any[] = [];
  currentSegment:any;
  segments:any[] = [];

  constructor(private exerciseService: ExerciseService,private http:HttpClient,private fb:FormBuilder,private replaceBlanksPipe: ReplaceBlanksPipe,private sanitizer:DomSanitizer) {
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  getSegmentClass(segment: string) {
    if (segment === 'INDEX') {
      return 'index-heading';
    } else if (segment.includes('SEGM') && segment.includes('-')) {
      return 'segment-parent';
    } else {
      return 'segment-child';
    }
  }

  extractVimeoId(url: string): { videoId: string | null, startTime: number } {
    const regex = /vimeo\.com\/(?:video\/)?(\d+)(?:\?t=(\d+))?/;
    const match = url.match(regex);
  
    if (match) {
      const videoId = match[1];  // The video ID is in the first capturing group
      const startTime = match[2] ? parseInt(match[2], 10) : 0;  // The start time is in the second group (if present)
  
      return { videoId, startTime };
    }
  
    return { videoId: null, startTime: 0 };
  }
  
  openModal(questionIndex:number,i:number){
    const index = this.replaceBlanksPipe.transform(i,'floor');
    const timeline = this.exercises.at(questionIndex).timeline.at(index);
    const { videoId, startTime } = this.extractVimeoId(timeline);
    const modal:any = document.getElementById('vimeo-answer');
    const modalContent = modal.querySelector('.modal-body');

    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${videoId}`;
    iframe.width = '100%';
    iframe.allow = 'autoplay;';
    
    const existingIframe = modalContent.querySelector('iframe');
    if (existingIframe) {
      modalContent.removeChild(existingIframe);
    }

    modalContent.appendChild(iframe);

    modal.style.display = 'block';
  }

  closeModal(){
    const modal:any = document.getElementById('vimeo-answer');
    modal.style.display = 'none';
  }

  initializePlayer() {
    const options = {
      id: Number(this.videoId),
      width: 500, 
      loop: false,
      title: false,         
      byline: false,        
      portrait: false,
      dnt: true,            
      transparent: false,
    };

    this.player = new Player(this.vimeoPlayerElement.nativeElement, options);

    this.player.on('play', () => {
      console.log('Video played!');
    });

    this.player.on('pause', () => {
      console.log('Video paused!');
    });
  }
  
  nextExercise(): void {   
    if (this.currentExerciseIndex < this.exercises.length - 1) {
      this.currentExerciseIndex++;
    }
  }

  prevExercise(): void {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex--;
    }
  }

  generateBlanks(answers: any): FormArray {
    const blanksArray = this.fb.array([]);
    answers.forEach(() => {
      blanksArray.push(this.fb.control('', Validators.required));
    });
    return blanksArray;
  }
    
  replacePlaceholders(question: string, questionIndex: number): string[] {
    const parts = question.split(/(\{\{\}\})/g);
    return parts;
  }

  getBlanks(questionIndex:number):FormArray{
    const blankControls = this.form.at(questionIndex).get('blanks');
    return blankControls as FormArray;
  }
  
  getFormGroup(index: number): FormGroup {
    return this.form.at(index) as FormGroup; // Access a FormGroup inside the FormArray
  }

  getAnswerControl(questionIndex:number,blankIndex:number):FormControl{
    const blankControls = this.getBlanks(questionIndex);
    return blankControls.at(blankIndex) as FormControl;
  }


  generateResults(answers:any):FormArray{
    const result = this.fb.array([]);
    answers.map((item:any)=>{
      result.push(this.fb.control(false));
    })
    return result as FormArray;
  }

  getResults(questionIndex:number):FormArray{
    return this.getFormGroup(questionIndex).get('results') as FormArray;
  }

  updateResult(questionIndex:number,i:number,result:boolean):void{
    const resultControl = this.getResults(questionIndex).at(i).setValue(result);
  }

  initializeForm() {
    this.exercises.map((item:any)=>{
      const question = this.fb.group({
        qid:item.q_id,
        exercise:item.exercise,
        question:item.question,
        blanks:this.generateBlanks(item.answers),
        isfeed:false,
        hide:false,
        results:this.generateResults(item.answers),
      });
      this.form.push(question);
    });
    console.log(this.form);
  }

  isAllCorrect(questionIndex:number):boolean{
    const results = this.form.at(questionIndex).get('results')?.value;
    return results.every((item:boolean)=>item === true);
  }

  showAnswer(questionIndex:number){
    const questionParts = this.replacePlaceholders(this.exercises[questionIndex].question, questionIndex);
    const answers = this.form.at(questionIndex).get('blanks')?.value;
    let question = '';
    console.log(answers);
    console.log(questionParts);
    questionParts.map((word:string,index:number)=>{
      if(word === '{{}}'){
        const j = Math.floor(index / 2);
        question += `<span style="color: green;">${answers[j]}</span>`;
      }else{
        question += word;
      }
    });
    return this.sanitizer.bypassSecurityTrustHtml(question);
  }


  finalCheck(questionIndex:number):void{
    this.form.at(questionIndex).get('hide')?.setValue(true);
  }

  checkAnswer(i: number) {
    const formData = this.getFormGroup(i);
    formData.get('isfeed')?.setValue(true);
    if (formData.valid) {
      const url = `${environment.baseURL}/api/check-answer/${this.currentSegment._id}`;
      console.log("API URL:", url);
      console.log("Form Data:", formData.value);
      this.http.put(url, formData.value).subscribe({
        next: (response:any) => {
          const results:any = response.result;
          results.map((ans:boolean,index:number)=>{
            this.updateResult(i,index,ans);
          });
        },
        error: (err) => {
          console.error("Error occurred:", err);
          if (err.status === 0) {
            console.error("Network issue: Unable to reach the server.");
          }
        },
        complete: () => {
          console.log("Request completed");
        },
      });
      console.log(this.form.value);
    } else {
      console.error("Form is invalid:", formData);
    }
  }
  
  changeSegment(segment:any){
    this.form = this.fb.array([]);
    this.currentSegment = segment;
    this.exerciseService.fetchData(segment._id).subscribe({
      next: (response) => {
        this.exercises = response.data.questions;
        console.log("Data",this.exercises);
        this.videoId = this.extractVimeoId(response.data.video).videoId || '';
        this.initializeForm();
        this.initializePlayer();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchExercise(){
    this.exerciseService.fetchData(this.currentSegment._id).subscribe({
      next: (response) => {
        this.exercises = response.data.questions;
        console.log("Data :",this.exercises);
        this.videoId = this.extractVimeoId(response.data.video).videoId || '';
        this.initializeForm();
        this.initializePlayer();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    this.form = this.fb.array([]);
    this.exerciseService.fetchsegments().subscribe({
      next:(response:any)=>{
        this.segments = response.data;
        this.currentSegment = response.data[0];
        this.fetchExercise();
      },  
      error:(err)=>{
        console.error(err);
      }
    });
  }
}
