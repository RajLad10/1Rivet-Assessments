import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  strLength = 10;

  transform(value: string): string {

    if (value.length > this.strLength) {
      return value.substring(0,this.strLength) + "..."
    } else {
      return value;
    }
  }

}
