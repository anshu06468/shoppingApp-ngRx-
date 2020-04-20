import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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
      private store:Store<fromApp.Appstate>
      ){}

  ngOnInit(){
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
