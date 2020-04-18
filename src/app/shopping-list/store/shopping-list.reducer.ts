import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions'

export interface State{
    ingredients:Ingredient[],
    editedIngredient:Ingredient,
    editedIngredientIndex:number
}

export interface Appstate{
    shoppingList:State
}

const intitalState:State={
     ingredients:[
        new Ingredient("apple",5),
        new Ingredient("oranges",15)
      ],
      editedIngredient:null,
      editedIngredientIndex:-1
};

export function shoppingListReducer(state=intitalState,action:ShoppingListActions.ShoppingListActions){
    switch(action.type){
        case ShoppingListActions.ADD_INGRIDIENT:
            // console.log(action.payload)
            return {
                ...state,
                ingredients:[
                    ...state.ingredients,
                    action.payload
                ]
            };
        case ShoppingListActions.ADD_INGRIDIENTS:
            return {
                ...state,
                ingredients:[
                    ...state.ingredients,
                    ...action.payload
                ]
            };
        case ShoppingListActions.UPDATE_INGRIDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
              ...ingredient,
              ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            // console.log(updatedIngredients)
            return {
                ...state,
                ingredients:updatedIngredients,
                editedIngredientIndex:-1,
                editedIngredient:null
            };
            
        
        case ShoppingListActions.DELETE_INGRIDIENT:
            return{
                ...state,
                ingredients:state.ingredients.filter((iq,index) =>{
                    return index!==state.editedIngredientIndex;
                }),
                editedIngredientIndex:-1,
                editedIngredient:null

            };
        
        case ShoppingListActions.START_EDIT:
            return{
                ...state,
                editedIngredientIndex:action.payload,
                editedIngredient:{...state.ingredients[action.payload]}
            };
        
        case ShoppingListActions.STOP_EDIT:
            return{
                ...state,
                editedIngredient:null,
                editedIngredientIndex:-1
            }
                
        default:
            return state;
    }
    // console.log
}


