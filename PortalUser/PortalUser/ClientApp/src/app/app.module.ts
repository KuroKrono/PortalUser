import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MaterialModule } from './modules/material.module';
import { UserModule } from './modules/user';
import { UserDeleteComponent } from './modules/user/user-delete/user-delete.component';
import { DepartmentModule } from './modules/department';
import { LoginModule } from './modules/login';
import { AuthService } from './auth.services';
import { AuthGuard } from './guard/auth.guard';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    
    NavMenuComponent,
   // HomeComponent,
    //CounterComponent,
    //FetchDataComponent
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    UserModule,
    LoginModule,
    DepartmentModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      //{ path: '', component: HomeComponent, pathMatch: 'full' },
     // { path: 'counter', component: CounterComponent },
     // { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
