import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceBlanks',
  standalone: true
})
export class ReplaceBlanksPipe implements PipeTransform {

  transform(value: number, method: 'round' | 'floor' | 'ceil' = 'round'): number {
    if (method === 'floor') {
      return Math.floor(value);
    } else if (method === 'ceil') {
      return Math.ceil(value);
    }
    return Math.round(value);
  }

}
