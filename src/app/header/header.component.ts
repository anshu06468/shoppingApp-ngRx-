import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeStorageService } from '../shared/recipe-storage.service';
import * as fromApp from '../store/app.reducer'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated=false;
  private userSub:Subscription;
  
  constructor(
    private dataStorageService:RecipeStorageService,
    private authService:AuthService,
    private store:Store<fromApp.Appstate>) { }

  ngOnInit() {
    this.userSub=this.store.select('auth')
        .pipe(
          map(authState=>{
            return authState.user
          })).subscribe(user=>{
      this.isAuthenticated=!!user;//trick !user?false:true
    })
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe(); 
  }

  logOut(){
    this.authService.logOut();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
