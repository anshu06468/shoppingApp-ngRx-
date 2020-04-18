import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'
import * as shoppingListActions from '../shopping-list/store/shopping-list.actions'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients:Ingredient[]}>;
  // private igChangedSub:Subscription;
  constructor(
      private store:Store<fromShoppingList.Appstate>
      ) { }

  ngOnInit() {

    this.ingredients=this.store.select('shoppingList');

    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangedSub=this.shoppingListService.ingredientsChanged.
    //   subscribe((ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients
    //   }
    //   )
  }

  ngOnDestroy(){
    // this.igChangedSub.unsubscribe();
  }

  onEditItem(index:number){
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new shoppingListActions.StartEdit(index));
  }
}
