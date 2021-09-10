import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { map } from 'rxjs/operators';
import { TokenService } from 'src/app/service/token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReviewRequest } from '../shared/models/ReviewRequest.model';
import { environment } from 'src/environments/environment';
import { Notification } from '../shared/models/Notification.model';



@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  stompClient: any;
  reviewNotification$ = new BehaviorSubject<boolean>(false);
  webSocketEndPoint: string = environment.API_PORT + 'live';
  notification$ = new BehaviorSubject<Notification>(new Notification());

  constructor(private tokenService: TokenService,
              private http:HttpClient
    ) {
    this._connect("/user/" + this.tokenService.getEmail() + "/queue/review")
  }




  addReviewToUser(review:ReviewRequest):Observable<any>{
    return this.http.post(environment.API_ROOT+"review/add",review).pipe(
      map((res)=>{
        return res;
      })
    )
    
  }

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(environment.API_ROOT + "notification/email?email=" + this.tokenService.getEmail())
  }


  deleteNotificationById(id:Number):Observable<true>{
    return this.http.delete<true>(environment.API_ROOT + "notification/delete?id=" + id);
  }


  // ************************SOCKJS*********************
  _connect(topic = "") {
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(topic, function (sdkEvent: any) {
        _this.onMessageReceived(sdkEvent);
      });
      _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);

  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: any) {
    setTimeout(() => {
      this._connect();
    }, 5000);
  }


  onMessageReceived(message: any) {
    this.notification$.next(JSON.parse(message.body));
    this.reviewNotification$.next(true);
  }

}
