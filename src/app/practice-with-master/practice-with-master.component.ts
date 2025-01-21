import { CommonModule } from "@angular/common";
import { Component, ElementRef, ViewChild,NgZone, OnInit  } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { similarityPercentage } from "../core/utils/compare";

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
  styleUrls: ["./practice-with-master.component.css","../../assets/scss/main.scss"],
})
export class PracticeWithMasterComponent implements OnInit {

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

  audioBlob: Blob | null = null;
  audioURL: string | null = null;
  private recognition: any;
  
  isListen = false;
  isRecording = false;

  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  transcription: string = '';

  currentTurn:string = 'veera';
  isVisible:boolean = false;
  questionIndex:number = 0;

  public questions:any[] = [
    {
      question:"kya tumane khaaya",
      answer:"haan, main abhee kha raha hoon",
      input:"",
      result:"",
    },
    {
      question:"bhaarat ka pita kaun hai",
      answer:"bhaarat ke raashtrapita mahaatma gaandhee hain",
      input:"",
      result:"",
    },
    {
      question:"aapaka kya naam hai",
      answer:"mera naam anavar hai",
      input:"",
      result:"",
    },
  ];

  public currQuestion:any;

  constructor(private ngZone: NgZone) {

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = true;
      this.recognition.continuous = true;

      this.recognition.onresult = (event: any) => {
        const transcriptArray = Array.from(event.results)
          .map((result: any) => result[0].transcript);
        console.log(transcriptArray);
        this.ngZone.run(() => {
          this.transcription = transcriptArray.join(' ');
          this.checkAnswer();
        });
      };

      this.recognition.onerror = (error: any) => {
        console.error('SpeechRecognition error:', error);
      };

      this.recognition.onend = () => {
        console.log('SpeechRecognition stopped.');
      };
    } else {
      console.error('SpeechRecognition is not supported in this browser.');
    }
  }

  ngOnInit(): void {
    this.currQuestion = this.questions.at(this.questionIndex);
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  getSegmentClass(segment: string) {
    if (segment === "INDEX") {
      return "index-heading";
    } else if (segment.includes("SEGMENT") && segment.includes("-")) {
      return "segment-parent";
    } else {
      return "segment-child";
    }
  }

  changeTurn(user:string){
    this.currentTurn = user;
  }

  showAnswer(){
    this.isVisible = !this.isVisible;
  }

  hearAgain(){
    
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(this.currQuestion.question);
    utterance.onend = () => {
      this.ngZone.run(() => {
        this.isListen = false;
        this.changeTurn('you');
        console.log('Speech has finished.');
      });
    };
    utterance.onstart = () => {
      this.ngZone.run(() => {
        this.isListen = true;
        this.changeTurn('veera');
        console.log('Speech has finished.');
      });
    };
    speechSynthesis.speak(utterance);
  }

  retry(){
    
    if (this.mediaRecorder) {
      this.isRecording = false;
      this.mediaRecorder.stop();
      console.log('Recording stopped.');
    }

    if (this.recognition) {
      this.recognition.stop();
      console.log('SpeechRecognition stopped.');
    }

    this.transcription = "";
    this.audioBlob = null;
    this.audioURL = null;
    this.audioChunks = [];
  }

  checkAnswer(){
    const levenshtein:number = similarityPercentage(this.transcription,this.currQuestion.answer,'levenshtein');
    const question = this.questions[this.questionIndex];
    question['input'] = this.transcription;
    this.currQuestion['input'] = this.transcription;
    if(levenshtein >= 60){
      question['result'] = true;
      this.currQuestion['result'] = true;
      this.stopRecording()
    }else{
      question['result'] = false;
      this.currQuestion['result'] = false;
    }
  }

  startRecording() {
    this.isRecording = true;
    this.changeTurn('you');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          this.isRecording = true;

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

          if (this.recognition) {
            this.recognition.start();
          }
        })
        .catch((error) => {
          console.error('Error accessing microphone:', error);
        });
    } else {
      console.error('getUserMedia is not supported in this browser.');
    }
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.isRecording = false;
      this.mediaRecorder.stop();
      console.log('Recording stopped.');
    }

    if (this.recognition) {
      this.recognition.stop();
      // console.log('SpeechRecognition stopped.');
    }
    this.checkAnswer();
    // this.changeTurn('veera');
  }

  next(){
    if(this.questionIndex >= 0 && this.questionIndex < this.questions.length-1 && this.questions[this.questionIndex]['result'] === true){
      this.questionIndex++;
      this.currQuestion = this.questions[this.questionIndex];
      this.isVisible = false;
      this.retry();
    }
  }

  prev(){
    if(this.questionIndex <= this.questions.length){
      this.questionIndex--;
      this.currQuestion = this.questions[this.questionIndex];
    }
  }

}
