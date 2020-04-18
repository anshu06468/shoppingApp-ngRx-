import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { RecipeStorageService } from '../shared/recipe-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated=false;
  private userSub:Subscription;
  
  constructor(private dataStorageService:RecipeStorageService,private authService:AuthService) { }

  ngOnInit() {
    this.userSub=this.authService.user.subscribe(user=>{
      this.isAuthenticated=!!user;//trick !user?false:true
    })
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe(); 
  }

  logOut(){
    this.authService.logOut();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
