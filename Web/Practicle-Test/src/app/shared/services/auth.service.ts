import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import { API_URL } from '../../app-global';
import { BehaviorSubject, Observable,of } from "rxjs";
import { filter, map,catchError, mapTo, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDetails,LoginBackEnd,LoginFrontEnd } from "../models/user";
import { UserService } from "./user.service";
import { Tokens } from '../models/tokens/tokens';
//export const ANONYMOUS_USER: User = new User();

@Injectable()
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly ROLE = 'ROLE';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly CURRENT_USER = 'CURRENT_USER';
  LoginObjectBackEnd: LoginBackEnd;
  LoginObjectFrontEnd: LoginFrontEnd;
  private loggedUser: string;

  user: Observable<firebase.User>;

  public currentUserSubject: BehaviorSubject<UserDetails>;
  public currentUser: Observable<UserDetails>;
  private subject = new BehaviorSubject<UserDetails>(undefined);


  user$: Observable<UserDetails> = this.subject
    .asObservable()
    .pipe(filter((user) => !!user));

  isLoggedIn$: Observable<boolean> = this.user$.pipe(
    map((user) => !!user.user_id)
  );

  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(
    map((isLoggedIn) => !isLoggedIn)
  );

  isAdmin$: Observable<boolean> = this.user$.pipe(
    map((user) => user.role=="Seller")
  );

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<UserDetails>(JSON.parse(localStorage.getItem(this.CURRENT_USER)));
    this.currentUser = this.currentUserSubject.asObservable();

  }
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

 getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  refreshToken() {
    return this.http.post<any>(`/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.token);
    }));
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  login(user:LoginFrontEnd): Observable<any> {
    this.setLoginObjectFromBackEnd(user);
    var url = '/api/Authentication/login';
    var data = this.LoginObjectBackEnd;
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
    };
    return this.http.post<any>(API_URL + url, data, httpOptions)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens)),
        tap(email => this.getUserDetails(user.email)),
        mapTo(true),
        catchError(error => {
          //alert(error.error);
          return of(error);
        }));
  }

  setLoginObjectFromBackEnd(obj: LoginFrontEnd){
    
    this.LoginObjectBackEnd = {
      Username: obj.email,
      password: obj.password
    }
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.ROLE,tokens.role)
    debugger
    localStorage.setItem(this.REFRESH_TOKEN, tokens.token);
  }
  // logout() {
  //   this.firebaseAuth.signOut().then((res) => {
  //     this.subject.next(ANONYMOUS_USER);
  //     this.router.navigate(["/"]);
  //   });
  // }

  private storeUserDetails(UserDetails: UserDetails) {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(UserDetails));
    this.currentUserSubject.next({
      first_name: UserDetails.first_name,
      last_name: UserDetails.last_name,
      role: UserDetails.role,
      shop_name:'',
      password: '',
      email: '',
      mobile: '',
      user_id: UserDetails.user_id,
      Identity_userId:UserDetails.Identity_userId
    });

  }

  private getUserDetails(email: String) {
    this.http.get<any>(API_URL + '/api/User/GetRolebyEmail?email=' + email).subscribe(data => {

      this.storeUserDetails({
        first_name: data.user_details.first_name || 'first_name',
        last_name: data.user_details.last_name || 'last_name',
        role: data.user_details.role,
        shop_name: data.user_details.shop_name,
        password: '',
        email: '',
        user_id: data.UserDetails.user_id,
        mobile:'',
        Identity_userId: data.user_details.Identity_userId
      });
    });

  }

  createUserWithEmailAndPassword(emailID: string, password: string) {
    return this.firebaseAuth.createUserWithEmailAndPassword(emailID, password);
  }

  signInRegular(email: string, password: string) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return this.firebaseAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
}
