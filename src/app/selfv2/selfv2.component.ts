import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-selfv2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selfv2.component.html',
  styleUrl: './selfv2.component.css',
})
export class Selfv2Component {
  public label: any[] = [
    { key: 'நான்', label: 'நான்' },
    { key: 'நாங்கள்', label: 'நாங்கள்' },
    { key: 'நீ', label: 'நீ' },
    { key: 'நான்', label: 'நான்' },
    { key: 'நீங்களே', label: 'நீங்களே' },
  ];
  public question: any[] = [
    {
      key: 'Quest1',
      quest: 'where is your company',
      tamil: 'உங்கள் அலுவலகம் எங்கே உள்ளது?',
    },
    {
      key: 'Quest1',
      quest: 'where is your company',
      tamil: 'உங்கள் அலுவலகம் எங்கே உள்ளது?',
    },
    {
      key: 'Quest1',
      quest: 'where is your company',
      tamil: 'உங்கள் அலுவலகம் எங்கே உள்ளது?',
    },
    {
      key: 'Quest1',
      quest: 'where is your company',
      tamil: 'உங்கள் அலுவலகம் எங்கே உள்ளது?',
    },
  ];
  public type3: any[] = [
    { key: 'Quest1', quest: 'I am here', tamil: 'நான் இங்கே இருக்கிறேன்' },
    { key: 'Quest1', quest: 'I am here', tamil: 'நான் இங்கே இருக்கிறேன்' },
    { key: 'Quest1', quest: 'I am here', tamil: 'நான் இங்கே இருக்கிறேன்' },
    { key: 'Quest1', quest: 'I am here', tamil: 'நான் இங்கே இருக்கிறேன்' },
    { key: 'Quest1', quest: 'I am here', tamil: 'நான் இங்கே இருக்கிறேன்' },
  ];
}
