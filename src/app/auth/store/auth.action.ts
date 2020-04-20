import { Action } from '@ngrx/store';

export const LOGIN_START="[Auth] login start"
export const AUTHENTICATE_SUCCESS="[Auth] authenticate success";
export const LOG_OUT="[Auth] logout";
export const AUTHENTICATE_FAIL ="[Auth] authenticate fail";
export const SIGNUP_START="[Auth] signup start"
export const CLEAR_ERROR="[Auth] clearError";
export const AUTO_LOGIN="[Auth] autologin";

export class AuthenticateSuccess implements Action{
    readonly type=AUTHENTICATE_SUCCESS;
    constructor(public payload:{
        email:string,
        userId:string,
        token:string,
        expirationDate:Date,
        redirect:boolean
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

export class AuthenticateFail implements Action{
    readonly type=AUTHENTICATE_FAIL
    constructor(public payload:string){}
}

export class SignUpStart implements Action{
    readonly type=SIGNUP_START
    constructor(public payload:{
        email:string,
        password:string
    }){}
}

export class ClearError implements Action{
    readonly type=CLEAR_ERROR
}

export class AutoLogin implements Action{
    readonly type=AUTO_LOGIN
}

export type AuthActions=AuthenticateSuccess
                        | LogOut
                        | LoginStart
                        | AuthenticateFail
                        | SignUpStart
                        | ClearError
                        | AutoLogin;