import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveriesService {

  API = environment.API_ROOT;

  constructor(private http:HttpClient) { }

  // Get All delevries

  public getAllDelevries():Observable<User[]>{
    return this.http.get<User[]>(this.API+"deliveries");

  }

  public getAllDelevriesByFilter(rating:Number,city:String):Observable<User[]>{
    return this.http.get<User[]>(this.API+"deliveries/filter?rating="+rating+"&city="+city);

  }


  
  public filterBy(param:String):Observable<User[]>{
    return this.http.get<User[]>(this.API+"deliveries/filter?param="+param);
  }




}
