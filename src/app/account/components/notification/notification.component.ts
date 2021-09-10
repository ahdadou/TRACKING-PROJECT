import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Notification } from '../../shared/models/Notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {


  notifications:Notification[]=[];
  constructor(private reviewService:ReviewService) { }

  ngOnInit() {
    this.fetchNotifications();
    this.reviewService.reviewNotification$.next(false);
    this.reviewService.notification$.subscribe(
      res=>{
        this.fetchNotifications();
      }
    )
  }




  fetchNotifications(){
    this.reviewService.getAllNotifications().subscribe(
      res=>{
        this.notifications=res;
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }


  deleteById(id:Number){
    this.reviewService.deleteNotificationById(id).subscribe(
      res=>{
        this.fetchNotifications();
      },
      err=>{

      }
    )

  }



}
