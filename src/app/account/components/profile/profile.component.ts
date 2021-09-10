import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';
import { Review } from '../../shared/models/Review.model';
import { ReviewRequest } from '../../shared/models/ReviewRequest.model';
import { User } from '../../shared/models/User.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  idProfile: String;
  currentUser: User = new User();
  user: User = new User();
  reviews: Review[];
  commnet:String;
  rating:Number;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private reviweService:ReviewService,
    private tokenService:TokenService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.idProfile = params['id'];
      this.getCurrentUser();
      this.getUser();
    });
  }



  currentUserSubscribe() {
    this.userService.currentUser$.subscribe(
      res => {
        this.currentUser = res;
        this.getUserReview();
      }
    )
  }


  getUser(){
    this.userService.currentUser$.subscribe(
      res => {
        this.user = res;
      }
    )
  }


  curentUserBySelctedId() {
    this.userService.getUserById(this.idProfile).subscribe(
      res => {
        this.currentUser = res;
        this.getUserReview();
      },
      err => {
        console.log(err);
      }
    )
  }


  getCurrentUser() {
    if (this.idProfile >= '0' && this.currentUser != null)
      this.curentUserBySelctedId();
    else
      this.currentUserSubscribe()

      
  }


  getUserReview(){
    this.userService.getUserReviewByEmail(this.currentUser.email).subscribe(
      res=>{
        this.reviews = res;
      },
      err=>{
        console.log(err);
      }
    )
  }

  send(){
    const reviewRequest=new ReviewRequest();
    reviewRequest.body=this.commnet;
    reviewRequest.email_receiver=this.currentUser.email;
    reviewRequest.email_sender=this.tokenService.getEmail();
    reviewRequest.rating=this.rating;
    this.clear();
    this.reviweService.addReviewToUser(reviewRequest).subscribe(
      res=>{
        this.getUserReview();
      },
      err=>{
        console.log(err);
      }
    )
  }


 clear(){
  this.rating=0;
  this.commnet='';
 }


}
