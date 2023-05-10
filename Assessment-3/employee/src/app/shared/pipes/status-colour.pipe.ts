import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColour'
})
export class StatusColourPipe implements PipeTransform {

  transform(value: string,): any {
    
  }

}
