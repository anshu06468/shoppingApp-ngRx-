import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule }from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import * as appReducer from './store/app.reducer'
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthEffects } from './auth/store/auth.effects';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule,
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
