import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  isOpen = false;

  notifications = [
    {
      question: 'Japanese Language in hPanel',
      segmentName: 'SEGMENT-1',
      segmentDesc: 'BE Form',
      answer: 'Translate hPanel into a new language—Japanese.',
      askedOn: 'December 18, 2024'
    },
    {
      question: 'Sorting websites in hPanel',
      segmentName: 'SEGMENT-2',
      segmentDesc: 'Pronoun',
      answer: 'Ability to sort your websites by the name and creation date on the Websites page.',
      askedOn: 'November 16, 2024'
    },
    {
      question: 'Web-based terminal',
      segmentName: 'SEGMENT-2',
      segmentDesc: 'Pronoun',
      answer:
        'I would like to have a web-based terminal to quickly execute shell commands (i.e., WP CLI) without an SSH client.',
      askedOn: 'November 08, 2024'
    },
    {
      question: 'Hostinger Amazon Affiliate without API keys',
      segmentName: 'SEGMENT-1',
      segmentDesc: 'BE Form',
      answer:
        'Ability to use the Hostinger Amazon Affiliate Connector plugin to build an affiliate marketing website.',
      askedOn: 'October 20, 2024'
    },
  ];

  toggleNotification() {
    this.isOpen = !this.isOpen;
  }

}
