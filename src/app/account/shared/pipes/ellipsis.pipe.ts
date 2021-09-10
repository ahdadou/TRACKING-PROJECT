import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(value: String ,numberOfChar:number): unknown {
    if(!value){
          return value;
    }
    if(value.length<numberOfChar){
      return value
    }
    return value.substring(0,numberOfChar)+ "..."
  }
}