import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthGuard } from './guards/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RentbookComponent } from './components/rentbook/rentbook.component';
import { MybookComponent } from './components/mybook/mybook.component';
import { EditbookComponent } from './components/editbook/editbook.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { RentlistComponent } from './components/rentlist/rentlist.component';
import { ApiInterceptorInterceptor } from './interceptors/api-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    RentbookComponent,
    MybookComponent,
    EditbookComponent,
    AddbookComponent,
    RentlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
