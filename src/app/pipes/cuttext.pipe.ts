import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext'
})
export class CuttextPipe implements PipeTransform {

  transform(text: string | undefined, limit: number): string {
    if (typeof text === 'string') {
      return text.split(' ').slice(0, limit).join(" ");
    } else {
      return '';
    }
  }
}
