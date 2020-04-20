import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store'

import { Recipe } from '../recipe.model';
import *  as RecipeActions from './recipe.action'
import { Injectable } from '@angular/core';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipe = this.action$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>("https://ng-courseshoppinglist.firebaseio.com/recipes.json")
        }),
        map(response => {
            // console.log(response)
            return response.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            })
        }),
        map(recipes => {
            //  console.log(recipes)
            // this.recipeservice.setRecipes(recipes)
            return new RecipeActions.SetRecipes(recipes)
        })
    )

    @Effect({dispatch:false})
    storeRecipe=this.action$.pipe(
        ofType(RecipeActions.STORE_RECIPE),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData,recipesState])=>{
            return this.http.put("https://ng-courseshoppinglist.firebaseio.com/recipes.json", recipesState.recipes)
         })
    )



    constructor(
        private action$: Actions,
        private http: HttpClient,
        private store:Store<fromApp.Appstate>
    ) { }

}
