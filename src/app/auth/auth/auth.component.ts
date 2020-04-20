import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../../shared/alert/alert.component'
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import * as fromApp from '../../store/app.reducer'
import * as AuthActions from '../store/auth.action'
import { Store } from '@ngrx/store';
 
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit ,OnDestroy{
  isLoginMode=true;
  isLoading=false;
  error:string =null;
  @ViewChild(PlaceholderDirective,{static:false}) alertHost:PlaceholderDirective;

  private closeSub:Subscription;
  private authsub:Subscription;

  constructor(
    private commponentResolver:ComponentFactoryResolver,
    private store:Store<fromApp.Appstate>) { }

  ngOnInit() {
    this.authsub=this.store.select('auth').subscribe(authState=>{
      this.isLoading=authState.loading;
      this.error=authState.authError;
      if(this.error){
        this.showErrorAlert(this.error)
      }
    })
  }
  onHandleError(){
    this.store.dispatch(new AuthActions.ClearError())
  }
  onSwithMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    const email=form.value.email;
    const password=form.value.password;
    if(this.isLoginMode){
      this.store.dispatch(new AuthActions.LoginStart({email:email,password:password}));
      // authObs=this.authService.logIn(email,password)
    }
    else{
      this.store.dispatch(new AuthActions.SignUpStart({email:email,password:password}));
    }

    form.reset();
  }

  private showErrorAlert(message:string){
    const alertCmpFactory=this.commponentResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainer=this.alertHost.viewCntrlRef;
    hostViewContainer.clear();
    const componentRef=hostViewContainer.createComponent(alertCmpFactory);
    componentRef.instance.message=message;
    this.closeSub=componentRef.instance.error.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainer.clear();
    })
  };

  ngOnDestroy(){
    if(this.closeSub)
      this.closeSub.unsubscribe();
    if(this.authsub)
      this.authsub.unsubscribe();
  }

}
