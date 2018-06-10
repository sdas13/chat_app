import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { InputParseComponent } from './components/input-parse/input-parse.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { SocketService } from './services/socket.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatWindowComponent, canActivate: [AuthGuard] },
  { path: 'input', component: InputParseComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ChatWindowComponent,
    InputParseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService, AuthService, SocketService, AuthGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }