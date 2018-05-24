import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken:any;
  user:any;

  constructor(private http:HttpClient) { }

  registerUser(user){
    return this.http.post(environment.apiEndpoint+'users/register',user);
  }

  authenticateUser(user){
    return this.http.post(environment.apiEndpoint+'users/authenticate',user);
  }

  getProfile(){
    this.loadToken();
    let httpOptions={
      headers:new HttpHeaders({
        'Authorization':this.authToken
      })
    }
    return this.http.get(environment.apiEndpoint+'users/profile',httpOptions);
  }

  loadToken(){
    let token=localStorage.getItem('id_token');
    this.authToken=token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  storeUserData(token,user){
     localStorage.setItem('id_token',token);
     localStorage.setItem('user',JSON.stringify(user)); 
     this.authToken=token;
     this.user=user;
  }

  logOut(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }
}
