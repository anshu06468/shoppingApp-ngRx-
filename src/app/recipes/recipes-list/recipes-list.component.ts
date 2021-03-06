import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from "../recipe.model";
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit,OnDestroy {
  recipes:Recipe[];
  subscription:Subscription;
  
  constructor(
              private router:Router,
              private route:ActivatedRoute,
              private store:Store<fromApp.Appstate>
              ) { }

  ngOnInit() {
   this.subscription= this.store.select("recipes")
                      .pipe(
                        map(recipeState=>{
                          // console.log(recipeState)
                          return recipeState.recipes
                        })
                      )
                      .subscribe(
                        (recipes:Recipe[])=>{
                          // console.log(recipes);
                          this.recipes=recipes
                        }
                      )
  }

  onNewRecipe(){
    this.router.navigate(["new"],{relativeTo:this.route})
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  

}
