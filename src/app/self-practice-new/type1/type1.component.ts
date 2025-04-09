import { Component } from '@angular/core';

@Component({
  selector: 'app-type1',
  templateUrl: './type1.component.html',
  styleUrl: './type1.component.css'
})
export class Type1Component {
public label:any[]=[
  {key:"நான்",label:"நான்"},
  {key:"நாங்கள்",label:"நாங்கள்"},
  {key:"நீ",label:"நீ"},
  {key:"நான்",label:"நான்"},
  {key:"நீங்களே",label:"நீங்களே"},

];

}
