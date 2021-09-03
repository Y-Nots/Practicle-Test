import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable, of } from 'rxjs';
import * as moment from "moment";
import { User } from "../models/user";
import { catchError, mapTo, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/app-global';
import { Seller_BackEnd, Seller_FrontEnd,Buyer_BackEnd,Buyer_FrontEnd } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  sellerObjectFrombackEnd: Seller_BackEnd;
  sellerObjectFromFrontEnd: Seller_FrontEnd;
  BuyerObjectFrombackEnd: Buyer_BackEnd;
  BuyerObjectFromFrontEnd: Buyer_FrontEnd;

  selectedUser: User = new User();
  users: AngularFireList<User>;

  location = {
    lat: null,
    lon: null,
  };

  constructor(private db: AngularFireDatabase,public http: HttpClient) {
    this.getUsers();
  }

  getUsers() {
    this.users = this.db.list("clients");
    return this.users;
  }

  postSeller(obj: Seller_BackEnd, is_seller: any): Observable<any> {
    this.setSellerObjectFromBackEnd(obj);
    var url = '/api/Users?isSeller=' + is_seller;
    var data = this.sellerObjectFrombackEnd;
    debugger;
    return this.http.post<any>(encodeURI(API_URL + url), data)
      .pipe(
        tap(tokens => ''),
        // mapTo(true),
        catchError(error => {
          debugger;
          return of(error.error);
        }));
  }

  postBuyer(obj: Buyer_BackEnd, is_seller: any): Observable<any> {
    this.setBuyerObjectFromBackEnd(obj);
    var url = '/api​/Users?isSeller=' + is_seller;
    var data = this.BuyerObjectFrombackEnd;
    var fsdfsd = encodeURIComponent(API_URL + url)
    return this.http.post<any>(fsdfsd, data)
      .pipe(
        tap(tokens => ''),
        // mapTo(true),
        catchError(error => {
          
          return of(error.error);
        }));
  }


  setSellerObjectFromBackEnd(obj: Seller_FrontEnd){
    
    this.sellerObjectFrombackEnd = {
      email: obj.email,
      mobile: obj.mobile.toString(),
      password: obj.password,
      shop_name: obj.shop_name,
      is_seller: obj.is_seller
    }
  }

  setBuyerObjectFromBackEnd(obj: Buyer_FrontEnd){
    this.BuyerObjectFrombackEnd = {
      email: obj.email,
      mobile: obj.mobile.toString(),
      password: obj.password,
      first_name: obj.first_name,
      last_name: obj.last_name,
      is_seller:false
    }
  }

  getUserById(id: string) {}

  createUser(data: any) {
    const updatedData = {
      ...data,
      location: this.location,
      createdOn: moment(new Date()).format("X"),
      isAdmin: false,
    };
    this.users.push(updatedData);
  }

  isAdmin(emailId: string) {
    return this.db.list("clients", (ref) =>
      ref.orderByChild("email").equalTo(emailId)
    );
  }

  updateUser(user: User) {
    this.users.update(user.$key, user);
  }

  setLocation(lat: any, lon: any) {
    this.location = { lat, lon };
  }
}
