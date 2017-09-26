import { Pipe, PipeTransform } from '@angular/core';
import IEntity from '../Model/IEntity';

@Pipe({
  name: 'displayName'
})
export class DisplayNamePipe implements PipeTransform {

  transform(value: IEntity[], filter: string): any {
    if (!filter) {
      return value;
    }

    filter = filter.toLocaleLowerCase();
    
    return value.filter((entityItem) => {
      return entityItem.displayName.toLowerCase().indexOf(filter) != -1;
    });
  }

}
