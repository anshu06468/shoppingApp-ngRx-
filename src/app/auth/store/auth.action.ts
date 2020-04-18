import { Action } from '@ngrx/store';

export const LOGIN_START="[Auth] login start"
export const LOG_IN="[Auth] login";
export const LOG_OUT="[Auth] logout";
export const LOGIN_FAIL="[Auth] loginFail"

export class LogIn implements Action{
    readonly type=LOG_IN;
    constructor(public payload:{
        email:string,
        userId:string,
        token:string,
        expirationDate:Date
    }){}
}

export class LogOut implements Action{
    readonly type=LOG_OUT;
}

export class LoginStart implements Action{
    readonly type=LOGIN_START
    constructor(public payload:{
        email:string,
        password:string
    }){}
}

export class LoginFail implements Action{
    readonly type=LOGIN_FAIL
    constructor(public payload:string){}
}

export type AuthActions=LogIn
                        | LogOut
                        | LoginStart
                        | LoginFail;