import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { ChatService } from '../../services/chat.service';
import { MessageRequest } from '../../shared/models/MessageRequest.model';
import { Messages } from '../../shared/models/Messages.model';
import { User } from '../../shared/models/User.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit,AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  messages: Messages[] = [];
  selectedUser: User ;
  currentUserEmail: String;
  msg:String;
  @Input() userEmail = ''; // decorate the property with @Input()


  constructor(
    private chatService: ChatService,
    private token: TokenService,

  ) { }

  ngOnInit(): void {
    this.chatService.messages$.subscribe(
      (res: Messages) => {
        this.messages.push(res);
      }
    )
    this.currentUserEmail = this.token.getEmail();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {

    }
  }

  getMessages(num: Number, user: User) {
    this.chatService.getMessagesByInboxId(num).subscribe(
      res => {
        this.selectedUser = user;
        this.messages = res;
        this.chatService.chatNotification$.next(false);
      },
      err => {
        console.log(err);
      }
    )
  }



  send() {
    const msgReq = new MessageRequest();
    msgReq.message = this.msg;
    msgReq.sender_email = this.currentUserEmail;
    msgReq.receiver_email = this.selectedUser.email;
    this.msg = '';
    this.chatService.sendMessages(msgReq).subscribe(
      res=>{
        // console.log(res);
      },
      err=>{
        // console.log(err);
      }
    )
  }

}
