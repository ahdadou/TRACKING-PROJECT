import { Pipe, PipeTransform } from "@angular/core"
import { Notification } from '../../shared/models/Notification.model';

@Pipe({
    name: 'diffDate'
})

export class DiffDate implements PipeTransform {

    transform(arr: Date): String{
      const today:any = new Date();
      const endDate:any = new Date(arr);
      // const days = (endDate - today) / (1000 * 60 * 60 * 24);
      // const days = Math.abs(today-endDate)/ (1000 * 60 * 60 * 24);
      
              // get total seconds between the times
        var delta = Math.abs(today-endDate ) / 1000;

        // calculate (and subtract) whole days
        var days:any = Math.floor(delta / 86400);
        // delta -= days * 86400;

        if(days>0) return parseInt(days)+' day ago'
        // calculate (and subtract) whole hours
        var hours:any = Math.floor(delta / 3600) % 24;
        // delta -= hours * 3600;
        if(hours>0) return parseInt(hours)+' hours ago'

        // calculate (and subtract) whole minutes
        var minutes:any = Math.floor(delta / 60) % 60;
        // delta -= minutes * 60;
        if(minutes>0) return parseInt(minutes)+' minutes ago'

        // what's left is seconds
        var seconds:any = delta % 60;  // in theory the modulus is not required
        if(seconds>0) return parseInt(seconds)+' seconds ago'

      return 1+'minutes';
      }

}



// const hours = parseInt(Math.abs(endDate - today) / (1000 * 60 * 60) % 24);
// const minutes = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60) % 60);
// const seconds = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000) % 60);