import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { Actions } from '@ngrx/effects';


export const SET_RECIPES='[Recipes] set Recipe';
export const FETCH_RECIPES='[RECIPES] fetch recipes';
export const ADD_RECIPE='[RECIPES] add Recipes';
export const DELETE_RECIPE='[RECIPES] delete Recipes';
export const UPDATE_RECIPE='[RECIPES] update Recipes';
export const STORE_RECIPE='[RECIPES] store Recipes';



export class SetRecipes implements Action{
    readonly type=SET_RECIPES;
    constructor(public payload:Recipe[]){}
}

export class FetchRecipe implements Action{
    readonly type=FETCH_RECIPES
}

export class AddRecipe implements Action{
    readonly type=ADD_RECIPE
    constructor(public payload:Recipe){}
}

export class DeleteRecipe implements Action{
    readonly type=DELETE_RECIPE
    constructor(public payload:number){}
}

export class UpdateRecipe implements Action{
    readonly type=UPDATE_RECIPE
    constructor(public payload:{index:number, newRecipe:Recipe}){
    }
}

export class StoreRecipes implements Action{
    readonly type=STORE_RECIPE
    
}
export type RecipeActions=SetRecipes
            | FetchRecipe
            | AddRecipe
            | DeleteRecipe
            | UpdateRecipe
            | StoreRecipes;