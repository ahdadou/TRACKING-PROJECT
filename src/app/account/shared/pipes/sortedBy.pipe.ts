import { Pipe, PipeTransform } from "@angular/core"
import { Notification } from '../../shared/models/Notification.model';

@Pipe({
    name: 'orderBy'
})

export class OrderBy implements PipeTransform {

    transform(arr: Notification[]): Notification[]{
        return arr.sort((a, b) => {
          if (a.createAt > b.createAt) {
            return -1;
          }
          if (a.createAt < b.createAt || a.createAt > b.createAt) {
            return 1;
          }
          return 0;
        });
      }

}