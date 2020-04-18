import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../shopping-list/store/shopping-list.actions'
import * as appState from '../store/app.reducer'

@Injectable()
export class RecipeService {
   recipesChanged=new Subject<Recipe[]>()
  //  private recipes:Recipe[]=[
  //       new Recipe("Pani poori",
  //                 "Description",
  //                 'https://lazizkhana.com/wp-content/uploads/2015/09/pani-puri.jpg',
  //                 [
  //                   new Ingredient("bread",1),
  //                   new Ingredient("meat",1)
  //                 ]),
  //       new Recipe("Samosa",
  //                 "Description",
  //                 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-500x500.jpg',
  //                 [
  //                   new Ingredient("bread",1),
  //                   new Ingredient("meat",1)
  //                 ])
  //     ];
    private recipes:Recipe[]=[];
    constructor(
      private store:Store<appState.Appstate>
      
      // private store:Store<{shoppingList:{ingredients:Ingredient[]}}>
      ){}

    setRecipes(recipes:Recipe[]){
      this.recipes=recipes;
      this.recipesChanged.next(this.recipes.slice());
    }
    
    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
      return this.recipes[index];
    }

    addIngridientsToShoppingList(ingredient:Ingredient[]){
      // this.slService.addIngridients(ingredient);
        this.store.dispatch(new shoppingListActions.AddIngredients(ingredient))
    }

    addRecipe(recipe:Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index:number, newRecipe:Recipe){
      this.recipes[index]=newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
      this.recipes.splice(index,1);
      this.recipesChanged.next(this.recipes.slice());
    }


}