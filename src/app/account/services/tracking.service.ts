import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { TokenService } from 'src/app/service/token.service';
import { Tracking } from '../shared/models/Tracking.model';
import { environment } from 'src/environments/environment';
import { Messages } from '../shared/models/Messages.model';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  stompClient: any;
  // tracking$ = new BehaviorSubject<Tracking>(new Tracking(51.233334,6.783333));
  tracking$ = new Subject<Tracking>();
  webSocketEndPoint: string = environment.API_PORT + 'live';


  constructor(private tokenService: TokenService,
    private http: HttpClient
  ) {

    // this._connect("/user/" + this.tokenService.getEmail() + "/queue/chat")

  }






  track(code:String){
    this._connect("/user/" + code + "/queue/tracking")
  }

  cancel(){
    this._disconnect();
  }

   // ************************SOCKJS*********************
   _connect(topic = "") {
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;

    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(topic, function (sdkEvent: Tracking) {
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
    this.tracking$.next(JSON.parse(message.body));
  }
}
