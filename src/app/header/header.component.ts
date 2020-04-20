import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../auth/store/auth.action'
import * as RecipeActions from '../recipes/store/recipe.action'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated=false;
  private userSub:Subscription;
  
  constructor(
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
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData(){
    // this.dataStorageService.fetchRecipes().subscribe(); 
    this.store.dispatch(new RecipeActions.FetchRecipe())
  }

  logOut(){
    this.store.dispatch(new AuthActions.LogOut());
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
