import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'

export interface authReturnData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer:any;

  constructor(private http: HttpClient,private router:Router) { }

  signUp(email: string, password: string) {
    return this.http.post<authReturnData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.FirebaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe
      (
        catchError(this.handleError),
        tap(respData => {
          this.handleAuthenticate(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
        })
        )
  }


  logIn(email: string, password: string) {
    return this.http.post<authReturnData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.FirebaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe
      (
        catchError(this.handleError),
        tap(respData => {
          this.handleAuthenticate(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
        })
      )
  }

  autoLogin(){
    const data:{
       email:string,
       id:string,
       _token:string,
       _tokenExpirationDate:string
    }=JSON.parse(localStorage.getItem("userData"));
    if(!data){
      return;
    }

    const loadedUser=new User(data.email,data.id,data._token,new Date(data._tokenExpirationDate));
    
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration=new Date(data._tokenExpirationDate).getTime()-new Date().getTime();
      this.autoLogOut(expirationDuration)
    }
  }

  autoLogOut(expirationDuration:number){
    // console.log(expirationDuration)
    this.tokenExpirationTimer=setTimeout(()=>{
      this.logOut();
    },expirationDuration)
  }

  logOut(){
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer=null;
  }

  private handleAuthenticate(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogOut(expiresIn*1000)
    localStorage.setItem("userData",JSON.stringify(user))
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "The email address is already in use by another account."
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "There is no user found with this email address";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is invalid or the user does not have a password.";
        break;
    }
    return throwError(errorMessage);
  }
}
