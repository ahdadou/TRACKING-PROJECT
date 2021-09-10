import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { ChatService } from '../../services/chat.service';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/User.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  chatNotification=false;
  reviewNotification=false;
  currentUser:User=new User();

  constructor(private chatService:ChatService,
              private userService:UserService,
              private reviewService:ReviewService,
              private router:Router,
              private tokenService:TokenService
              ) { }

  ngOnInit() {

    this.chatService.chatNotification$.subscribe(
      res=>{
        this.chatNotification = res;
      }
    );

    this.reviewService.reviewNotification$.subscribe(
      res=>{
        this.reviewNotification = res;
      }
    );

    

    this.userService.getCurrentUserByEmail().subscribe(
      res=>{
        this.userService.currentUser$.subscribe(
          res=>{
            this.currentUser = res;
          }
        )
      }
    );
    

  }


  reviewsubscribe(){
    this.reviewService.reviewNotification$.subscribe(
      res=>{
        this.reviewNotification=res;
      }
    )
  }

  signout(){
    this.tokenService.logOut();
    this.router.navigateByUrl('/home');
  }

  // profile(){
  //   this.router.navigate(["/acc/profile/-1"]);
  // }



}
