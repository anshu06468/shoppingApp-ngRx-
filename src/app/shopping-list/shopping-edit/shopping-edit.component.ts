import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from'../store/shopping-list.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  // @ViewChild("nameInput",{static:true}) nameInputRef:ElementRef
  // @ViewChild("amountInput",{static:true}) amountInputRef:ElementRef
  @ViewChild("f",{static:false}) slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  // editedItemIndex:number;
  editedItem:Ingredient;

  constructor(
      private store:Store<fromShoppingList.Appstate>
      ) { }

  ngOnInit() {
    this.subscription=this.store.select("shoppingList").subscribe(stateData=>{
      if(stateData.editedIngredientIndex>-1){
        this.editMode=true;
        this.editedItem=stateData.editedIngredient;
        // console.log(this.editedItem)
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }else{
        this.editMode=false;
      }

    })
    // this.subscription=this.slService.startedEditing 
    //       .subscribe(
    //         (index:number)=>{
    //           this.editedItemIndex=index;
    //           this.editMode=true;
    //           this.editedItem=this.slService.getIngredient(index);
    //           console.log(this.editedItem)
    //           this.slForm.setValue({
    //             name:this.editedItem.name,
    //             amount:this.editedItem.amount
    //           })
    //         }
    //       );
  }
  onSubmit(form:NgForm){
    // const newIngredient=new Ingredient(this.nameInputRef.nativeElement.value,
                                      // this.amountInputRef.nativeElement.value)
      const value=form.value;
      const newIngredient=new Ingredient(value.name,value.amount)
      if(this.editMode){
        // this.slService.updateIngredient(this.editedItemIndex,newIngredient)
        this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
        // console.log(this.slService.getIngredients());
      }else{
        this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
        // console.log(newIngredient)
        // this.slService.pushIngredients(newIngredient);
      }
      this.editMode=false;
      this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(){
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
