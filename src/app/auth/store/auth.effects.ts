import { Actions, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from './auth.action'
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface authReturnData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean,
    redirect:boolean
}

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: string) => {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user=new User(email,userId,token,expirationDate);
    localStorage.setItem("userData",JSON.stringify(user))
    return new AuthActions.AuthenticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate,
        redirect:true
    })
}

const handleError = (errorRes: any) => {
    let errorMessage = "An unknown error occurred";
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage))
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
    return of(new AuthActions.AuthenticateFail(errorMessage))
}

@Injectable()
export class AuthEffects {

    @Effect()
    authSignUp = this.action$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignUpStart) => {
            return this.http.post<authReturnData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.FirebaseApiKey,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            ).pipe
                (
                    tap(respData=>{
                        this.authService.setLogoutTimer(+respData.expiresIn*1000)
                    }),
                    map(respData => {
                        return handleAuthentication(respData.email, respData.localId, respData.idToken, respData.expiresIn);
                    }),

                    catchError(errorRes => {
                        return handleError(errorRes);
                    })
                )
        })
    )



    @Effect()
    authLogin = this.action$.pipe
        (
            ofType(AuthActions.LOGIN_START),
            switchMap((authData: AuthActions.LoginStart) => {
                return this.http.post<authReturnData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.FirebaseApiKey,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }
                ).pipe
                    (
                        tap(respData=>{
                            this.authService.setLogoutTimer(+respData.expiresIn*1000)
                        }),
                        map(respData => {
                            return handleAuthentication(respData.email, respData.localId, respData.idToken, respData.expiresIn);
                        }),

                        catchError(errorRes => {
                            return handleError(errorRes);
                        })
                    )
            })
        )

    @Effect({ dispatch: false })
    authRedirect = this.action$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authAction:AuthActions.AuthenticateSuccess) => {
            if(authAction.payload.redirect)
                this.router.navigate(['/']);
        })
    )
    
    @Effect({ dispatch: false })
    authLogOut=this.action$.pipe(
        ofType(AuthActions.LOG_OUT),
        tap(()=>{
            this.router.navigate(['/auth'])
            this.authService.clearTimer();
            localStorage.removeItem("userData");
        })
    )

    @Effect()
    autoLogin=this.action$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(()=>{
            
            const data:{
                email:string,
                id:string,
                _token:string,
                _tokenExpirationDate:string
             }=JSON.parse(localStorage.getItem("userData"));
             if(!data){
                 return {type:"DUMMY"};
             }
         
             const loadedUser=new User(data.email,data.id,data._token,new Date(data._tokenExpirationDate));
             
             if(loadedUser.token){
                 const expirationDuration=new Date(data._tokenExpirationDate).getTime()-new Date().getTime();
                 this.authService.setLogoutTimer(expirationDuration)
               // this.user.next(loadedUser);
               return new AuthActions.AuthenticateSuccess(
                   {
                       email:loadedUser.email,
                       userId:loadedUser.id,
                       token:loadedUser.token,
                       expirationDate:new Date(data._tokenExpirationDate),
                       redirect:false
                    }
               )
            //    this.autoLogOut(expirationDuration)
             }

             return {type:"DUMMY"}



        })
    )
    constructor(
        private action$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService:AuthService) { }
}