import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router } from '@angular/router';
import AuthService from '../../Services/auth.service';

@Injectable()
export default class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
        const userData =this.authService.getUserData();
        if (userData){
            return true;
        }
        
        this.router.navigate(['signin']);
        return false;
    }

}