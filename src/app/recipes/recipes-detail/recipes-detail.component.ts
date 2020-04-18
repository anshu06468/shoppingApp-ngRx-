import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe:Recipe
  id:number

  constructor(private reciepeService:RecipeService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.route.params.
              subscribe(
                (params:Params)=>{
                  this.id=+params['id'];
                  this.recipe=this.reciepeService.getRecipe(this.id);
                }
              )
  }

  onAddToShoppingList(){
    this.reciepeService.addIngridientsToShoppingList(this.recipe.ingredients)
  }
  onEditRecipe(){
    this.router.navigate(["edit"],{relativeTo:this.route})
  }

  onDeleteRecipe(){
    this.reciepeService.deleteRecipe(this.id);
    this.router.navigate(['./recipes'])
  }

}
