import { Component } from '@angular/core';
import { VideocallactionComponent } from '../videocallaction/videocallaction.component';

@Component({
  selector: 'app-callconnected',
  standalone: true,
  imports: [VideocallactionComponent],
  templateUrl: './callconnected.component.html',
  styleUrl: './callconnected.component.css'
})
export class CallconnectedComponent {

}
