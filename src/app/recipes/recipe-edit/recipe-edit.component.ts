import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as Recipeaction from '../store/recipe.action'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit,OnDestroy {
  id:number;
  editMode:boolean=false;
  recipeForm:FormGroup;
  private storeSub:Subscription

  constructor(private route:ActivatedRoute,
              private router:Router,
              private store:Store<fromApp.Appstate>,
            ) { }

  ngOnInit() {
    this.route.params.
              subscribe(
                (params:Params)=>{
                  this.id=+params['id'];
                  this.editMode=params['id'] != null;
                  this.initForm();
                }
              )
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients=new FormArray([]);

    if(this.editMode){

      this.storeSub=this.store.select("recipes").pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          })
        })
      ).subscribe(recipe => {
        console.log(recipe)
        recipeName=recipe.name;
        recipeImagePath=recipe.imagePath;
        recipeDescription=recipe.description;
      })
    }

    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    });
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
      })
    )
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  onSumbit(){
   
    if(this.editMode){
     this.store.dispatch(new Recipeaction.UpdateRecipe({index:this.id,newRecipe:this.recipeForm.value}))
   }else{
    this.store.dispatch(new Recipeaction.AddRecipe(this.recipeForm.value))
   }
   this.onCancel();
  }

  onCancel(){
    this.router.navigate(["../"],{relativeTo:this.route})
  }

  ngOnDestroy(){
    if(this.storeSub)
    this.storeSub.unsubscribe();
  }

}
