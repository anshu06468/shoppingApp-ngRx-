import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules,  } from '@angular/router';

const approutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: "full" },
  { path:'recipes',loadChildren:'./recipes/recipes.module#RecipesModule'}, //both method is same
  { 
    path:'shopping-list',
    loadChildren:()=>
      import('./shopping-list/shopping-list.module').  //same like above
      then(m=>m.ShoppingListModule)
  },
  {
    path:'auth',
    loadChildren:'./auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(approutes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
