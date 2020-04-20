import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import {isPlatformBrowser} from '@angular/common';

import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.action'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shopping';
  loadedFeature:string="recipe"

  constructor(
      private store:Store<fromApp.Appstate>,
      @Inject(PLATFORM_ID) private Platformid
      ){}

  ngOnInit(){
    if(isPlatformBrowser(this.Platformid)){
      this.store.dispatch(new AuthActions.AutoLogin());
    }
  }
}
