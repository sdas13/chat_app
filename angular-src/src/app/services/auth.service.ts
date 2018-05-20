import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken:any;
  user:any;

  constructor(private http:HttpClient) { }

  registerUser(user){
    return this.http.post('http://localhost:8888/users/register',user);
  }

  authenticateUser(user){
    return this.http.post('http://localhost:8888/users/authenticate',user);
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
