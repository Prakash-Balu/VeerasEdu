import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiList } from '../modal/interface/card';
import { inject } from '@angular/core';
@Component({
  selector: 'app-practice-master',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './practice-master.component.html',
  styleUrl: './practice-master.component.css',
})
export class PracticeMasterComponent implements OnInit {

apiCard:ApiList[]=[];

http = inject(HttpClient)

  ngOnInit(): void {
    this.storeApiValue()
  }
  storeApiValue(){
    this.http.get("http://192.168.0.12:3000/practicewithmasterCustomer/listPractices").subscribe((res:any)=>{this.apiCard=res.data})
  }
  // card: any[] = [];

  // ngOnInit(): void {
  //   this.card = [
  //     { id: '1', header: 'SEGMENT1', content: 'Pronoun', link: '/segment1' },
  //     { id: '2', header: 'SEGMENT2', content: 'Pronoun', link: '/segment1' },
  //     { id: '3', header: 'SEGMENT3', content: 'Pronoun', link: '/segment1' },
  //     { id: '4', header: 'SEGMENT4', content: 'Pronoun', link: '/segment1' },
  //     { id: '5', header: 'SEGMENT5', content: 'Pronoun', link: '/segment1' },
  //     { id: '6', header: 'SEGMENT6', content: 'Pronoun', link: '/segment1' },
  //     { id: '7', header: 'SEGMENT7', content: 'Pronoun', link: '/segment1' },
  //     { id: '8', header: 'SEGMENT8', content: 'Pronoun', link: '/segment1' },
  //   ];
  // }
}
