import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()

export class LoginGuard implements CanActivate {

    constructor(private _router: Router, private _authService: AuthService) { }

    canActivate() {
        if (this._authService.loggedIn()) {
            this._router.navigate(['/dashboard'])
            return false;
        }
        else
            return true;
    }

}