import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import from '../../../node_modules/rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken:any;
  user:any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8888/users/register',user,{headers:headers});
  }
}
