import { Pipe, PipeTransform } from '@angular/core';
import { DaysOfWeek } from '../../../models/days-of-week.enum';

@Pipe({
  name: 'days'
})
export class DaysPipe implements PipeTransform {

  transform(values: number[], args?: any): any {
    if(this.isSecuencialList(values)){
      return `Desde el ${DaysOfWeek[values[0]].toString()} hasta el ${DaysOfWeek[
        values[values.length - 1]
      ].toString()}`;
    }    
    return `Todos los ${values.map(x=> `${DaysOfWeek[x].toString()}`).join(", ")}`
  }

  private isSecuencialList(values: number[]): boolean{
    return (values.every((num, i) => i === values.length - 1 || num + 1 === (values[i + 1])))
  }

}
