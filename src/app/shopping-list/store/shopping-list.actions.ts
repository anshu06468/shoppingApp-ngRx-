import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGRIDIENT='[Shopping List] Add ingredient';
export const ADD_INGRIDIENTS='[Shopping List] Add ingredients';
export const DELETE_INGRIDIENT='[Shopping List] Delete ingredient';
export const UPDATE_INGRIDIENT='[Shopping List] Update ingridient';
export const START_EDIT="[Shopping List] start edit";
export const STOP_EDIT="[Shopping List] stop edit";


export class AddIngredient implements Action{
    readonly type=ADD_INGRIDIENT;

    constructor(public payload:Ingredient){
        // console.log(payload)
    }
}

export class AddIngredients implements Action{
    readonly type=ADD_INGRIDIENTS;

    constructor(public payload:Ingredient[]){}
}

export class UpdateIngredient implements Action{
    readonly type=UPDATE_INGRIDIENT;

    constructor(public payload:Ingredient){}
}


export class DeleteIngredient implements Action{
        readonly type=DELETE_INGRIDIENT;

}

export class StartEdit implements Action{
        readonly type=START_EDIT; 
        constructor(public payload:number){}   
}
    
export class StopEdit implements Action{
        readonly type=STOP_EDIT;    
}



export type ShoppingListActions=AddIngredient
                                | AddIngredients
                                | DeleteIngredient
                                | UpdateIngredient
                                | StartEdit
                                | StopEdit;