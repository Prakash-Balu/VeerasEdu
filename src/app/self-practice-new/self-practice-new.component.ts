import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ExerciseService, Question } from "../core/services/exercise.service";

@Component({
  selector: 'app-self-practice-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './self-practice-new.component.html',
  styleUrl: './self-practice-new.component.css'
})
export class SelfPracticeNewComponent implements OnInit {

  public questions: Question[] = [];

  form!: FormGroup;  // Changed to FormGroup to hold FormArray

  public currentPage: number = 0; // Page index
  public itemsPerPage: number = 2;

  constructor(private http: HttpClient, private fb: FormBuilder,private exerciseService:ExerciseService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      questions: this.fb.array([])
    });
    this.exerciseService.fetchQuestions('67a70088786c985a10d8734f').subscribe({
      next:(response:any)=>{
        this.questions = response.data;
        console.log(this.questions);
        this.initializeForm();
      },  
      error:(err)=>{
        console.error(err);
      }
    });
  }

  get paginatedQuestions(): FormArray {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return new FormArray(this.questionsArray.controls.slice(start, end));
  }
  
  
  get questionsArray(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  generateBlanks(answers: any): FormArray {
    return this.fb.array(
      answers.map(() => this.fb.control('', Validators.required)) // Ensure correct FormControl creation
    );
  }

  generateErrors(answers:any):FormArray{
    return this.fb.array(
      answers.map(() => this.fb.control(false, Validators.required))
    );
  }

  getErrors(i:number):FormArray{
    return this.questionsArray.at(i).get('errors') as FormArray;
  }

  getBlanks(index:number):FormArray{
    const question = this.questionsArray.at(index);
    return question.get('blanks') as FormArray;
  }

  getDash(i:number,j:number):FormControl{
    return this.getBlanks(i).at(j) as FormControl;
  }


  check(index: number) {
    const question = this.questionsArray.at(index); // Get the question form group
    const correctAnswers = this.questions[index].answers; // Correct answers for this question
    const userInputs = this.getBlanks(index).value; // User inputs for this question

    // console.log("User Inputs:", userInputs);
    // console.log("Correct Answers:", correctAnswers);

    userInputs.forEach((ans: string, j: number) => {
      if (ans.trim().toLowerCase() !== correctAnswers[j].trim().toLowerCase()) {
        this.getErrors(index).at(j).setValue(true); 
      } else {
        this.getErrors(index).at(j).setValue(false);
      }
    });

    console.log("Updated Question Data:", question.value);
  }

  retry() {
    this.paginatedQuestions.controls.forEach((control: any) => control.get('blanks').reset());
    this.paginatedQuestions.controls.forEach((control:any) => control.get('errors').reset());
    this.paginatedQuestions.controls.forEach((control:any) => control.get('show').setValue(false));
  }

  nextPage() {
    if ((this.currentPage + 1) * this.itemsPerPage < this.questions.length) {
      this.currentPage++;
    } else {
      alert('Quiz Completed!');
    }
  }

  showAnswer(i:number):void{
    const show = this.questionsArray.at(i).get('show')?.value;
    this.questionsArray.at(i).get('show')?.setValue(!show);
  }

  initializeForm() {
    this.questions.forEach((item: any) => {
      const question = this.fb.group({
        qid: [item.q_id],
        tamil: [item.tamil],
        english: [item.english],
        answers: [item.answers], // Store answers
        blanks: this.generateBlanks(item.answers), // Generate blank input fields
        errors:this.generateErrors(item.answers),
        show:false,
      });

      this.questionsArray.push(question);
    });

    console.log(this.form.value);
  }
}
