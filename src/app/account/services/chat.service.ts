import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TokenService } from 'src/app/service/token.service';
import { environment } from 'src/environments/environment';
import { InboxComponent } from '../components/inbox/inbox.component';
import { Inbox } from '../shared/models/Inbox.model';
import { MessageRequest } from '../shared/models/MessageRequest.model';
import { Messages } from '../shared/models/Messages.model';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatURL = environment.API_ROOT + "inbox";
  webSocketEndPoint: string = environment.API_PORT + 'live';
  stompClient: any;
  messages$ = new Subject<Messages>();
  chatNotification$ = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient,
    private tokenService: TokenService,
  ) {
    this._connect("/user/" + this.tokenService.getEmail() + "/queue/chat")
  }





  //get Inbox By User Email
  public getInbox(): Observable<Inbox[]> {
    const email = this.tokenService.getEmail();
    return this.http.get<Inbox[]>(this.chatURL + "/" + email);

  }

  //get Messages By Inbox

  public getMessagesByInboxId(id: Number): Observable<Messages[]> {
    return this.http.get<Messages[]>(this.chatURL + "/messages?id=" + id);

  }


  //Send Msg

  public sendMessages(msg: MessageRequest): Observable<Messages> {
    return this.http.post<Messages>(this.chatURL + "/add", msg).pipe(
      map((reponse: Messages) => {
        this.messages$.next(reponse);
        return reponse;
      })
    );

  }


  // ************************SOCKJS*********************
  _connect(topic = "") {
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;

    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(topic, function (sdkEvent: Messages) {
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
    this.messages$.next(JSON.parse(message.body));
    this.chatNotification$.next(true);
  }



}
