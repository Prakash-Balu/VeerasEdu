import { Component } from '@angular/core';
import { VideocallactionComponent } from '../videocallaction/videocallaction.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calling',
  standalone: true,
  imports: [VideocallactionComponent, RouterLink],
  templateUrl: './calling.component.html',
  styleUrl: './calling.component.css'
})
export class CallingComponent {

}
