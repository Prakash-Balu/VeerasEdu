import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-side',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side.component.html',
  styleUrl: './side.component.css'
})
export class SideComponent {
  segments = [
    {
      name: 'SEGMENT-1',
      expanded: false,
      classRoom: {
        topics: ['1.1 Pronoun', '1.2 Supportive verbs', '1.3 Example Sentences']
      },
      otherSections: [
        { name: 'Self-Practice', icon: 'bi bi-journal-text' },
        { name: 'Practice With Master', icon: 'bi bi-controller' },
        { name: 'Speaking Room', icon: 'bi bi-camera-video' }
      ]
    },
    {
      name: 'SEGMENT-2',
      expanded: false,
      classRoom: null,
      otherSections: []
    },
    {
      name: 'SEGMENT-3',
      expanded: true,
      classRoom: {
        topics: ['1.1 Pronoun', '1.2 Supportive verbs', '1.3 Example Sentences']
      },
      otherSections: [
        { name: 'Self-Practice', icon: 'bi bi-journal-text' },
        { name: 'Practice With Master', icon: 'bi bi-controller' },
        { name: 'Speaking Room', icon: 'bi bi-camera-video' }
      ]
    }
  ];

  toggle(segment: any) {
    segment.expanded = !segment.expanded;
  }
}
