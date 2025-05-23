import { Component } from '@angular/core';

@Component({
  selector: 'app-calldefault',
  standalone: true,
  imports: [],
  templateUrl: './calldefault.component.html',
  styleUrl: './calldefault.component.css'
})
export class CalldefaultComponent {
visible:boolean = true;
  hideDefaultcall(){
    this.visible = this.visible?false:true;
  }
}
