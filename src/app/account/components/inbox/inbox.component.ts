import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';
import { Inbox } from '../../shared/models/Inbox.model';
import { MessageRequest } from '../../shared/models/MessageRequest.model';
import { Messages } from '../../shared/models/Messages.model';
import { User } from '../../shared/models/User.model';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  inbox: Inbox[];
  messages: Messages[] = [];
  selectedUser: User;
  currentUserEmail: String;
  newMessage: Messages;
  msg: String;
  notify: boolean;
  idProfile: Number;


  constructor(
    private chatService: ChatService,
    private token: TokenService,
    private route: ActivatedRoute,
    private userService: UserService

  ) {

  }

  ngOnInit() {


    this.route.params.subscribe(params => {
      this.idProfile = params['id'];
      this.getData();
    });





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



  getData() {
    if (this.idProfile > 0) {
      this.getUserById(this.idProfile);
    }
    this.chatService.messages$.subscribe(
      (res: Messages) => {
        this.messages.push(res);
      }
    )
    this.chatService.chatNotification$.subscribe(
      res => {
        if (res == true) this.getInbox();
      }
    )
    this.getInbox();
    this.currentUserEmail = this.token.getEmail();
  }


  getInbox() {
    this.chatService.getInbox().subscribe(
      (res) => {
        this.inbox = res;
      },
      err => {
        console.log(err);
      }
    )
  }


  getUserById(id: any) {
    this.userService.getUserById(id).subscribe(
      res => {
        this.selectedUser = res;
      }, err => {
        console.log(err);
      }
    )
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
      res => {
        // console.log(res);
        this.getInbox();
      },
      err => {
        // console.log(err);
      }
    )
  }




}
