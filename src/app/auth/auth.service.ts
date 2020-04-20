import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.action'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer:any;

  constructor(
    private store:Store<fromApp.Appstate>
    ) { }

  setLogoutTimer(expirationDuration:number){
    // console.log(expirationDuration)
    this.tokenExpirationTimer=setTimeout(()=>{
      this.store.dispatch(new AuthActions.LogOut())
    },expirationDuration)
  }

  clearTimer(){
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer=null;

    }
  }
}
