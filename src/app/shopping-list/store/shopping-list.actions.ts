import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGRIDIENT='ADD INGREDIENT';
export const ADD_INGRIDIENTS='ADD INGREDIENTS';
export const DELETE_INGRIDIENT='DELETE INGREDIENT';
export const UPDATE_INGRIDIENT='UPDATE INGREDIENT';
export const START_EDIT="START_EDIT";
export const STOP_EDIT="STOP_EDIT";


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