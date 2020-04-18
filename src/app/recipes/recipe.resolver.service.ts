import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeStorageService } from '../shared/recipe-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {


  constructor(private dataStorageService:RecipeStorageService,private recipeService:RecipeService) { }
  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const recipes=this.recipeService.getRecipes();
    if(recipes.length === 0){
      return this.dataStorageService.fetchRecipes();
    }else{
      return recipes;
    }
  }



}
