import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipeAction from '../store/recipe.action'
import * as ShoppingAction from '../../shopping-list/store/shopping-list.actions'

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe
  id: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.Appstate>,
  ) { }

  ngOnInit() {
    this.route.params.
      subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.store.select("recipes").pipe(
            map(recipeState => {
              return recipeState.recipes.find((recipe, index) => {
                return index === this.id;
              })
            })
          ).subscribe(recipe => {
            this.recipe = recipe;
          })
        }
      )
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingAction.AddIngredients(this.recipe.ingredients))
  }
  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route })
  }

  onDeleteRecipe() {
    // this.reciepeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeAction.DeleteRecipe(this.id));
    this.router.navigate(['./recipes'])
  }

}
