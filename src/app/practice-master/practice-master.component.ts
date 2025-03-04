import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-practice-master',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './practice-master.component.html',
  styleUrl: './practice-master.component.css',
})
export class PracticeMasterComponent implements OnInit {
  card: any[] = [];

  ngOnInit(): void {
    this.card = [
      { id: '1', header: 'SEGMENT1', content: 'Pronoun', link: '/segment1' },
      { id: '2', header: 'SEGMENT2', content: 'Pronoun', link: '/segment1' },
      { id: '3', header: 'SEGMENT3', content: 'Pronoun', link: '/segment1' },
      { id: '4', header: 'SEGMENT4', content: 'Pronoun', link: '/segment1' },
      { id: '5', header: 'SEGMENT5', content: 'Pronoun', link: '/segment1' },
      { id: '6', header: 'SEGMENT6', content: 'Pronoun', link: '/segment1' },
      { id: '7', header: 'SEGMENT7', content: 'Pronoun', link: '/segment1' },
      { id: '8', header: 'SEGMENT8', content: 'Pronoun', link: '/segment1' },
    ];
  }
}
