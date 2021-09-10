import { Component, OnInit } from '@angular/core';
import { DeliveriesService } from '../../services/deliveries.service';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/User.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {


  city: String=" ";
  rating: Number=-1;
  users: User[]=[];
  name:String
  currentUser: User = new User();


  constructor(private delevriesService: DeliveriesService,private userService:UserService) { }

  ngOnInit() {
    this.getDelevries();
    this.currentUserSubscribe()
  }


  getDelevries() {
    // this.delevriesService.getAllDelevries().subscribe(
    this.userService.getAllUsers().subscribe(
      res => {
        this.users = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  

  filter() {
    console.log(this.rating + " ... "+this.city);
    this.delevriesService.getAllDelevriesByFilter(this.rating, this.city).subscribe(
      res => {
        this.users = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }


  currentUserSubscribe() {
    this.userService.currentUser$.subscribe(
      res => {
        this.currentUser = res;
      }
    )
  }
  reserRating(){
    this.rating=-1;
  }


  filterbyName(){
    this.delevriesService.filterBy(this.name).subscribe(
      res => {
        this.users = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }


}
