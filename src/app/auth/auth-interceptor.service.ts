import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService:AuthService,
    private store:Store<fromApp.Appstate>) { }

  intercept(req:HttpRequest<any>,next:HttpHandler){
    return this.store.select('auth').pipe(
      take(1),
      map(authState=>{
        return authState.user
      }),
      exhaustMap(user=>{

        if(!user){
          // console.log("sdf"); 
          return next.handle(req);
        }
        const modifiedReq=req.clone({
          params:new HttpParams().set('auth',user.token)
        });
        return next.handle(modifiedReq)

      })
    );
  }
}
