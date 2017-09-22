import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import User from '../Model/user';
import httpHelper from '../Services/httpHelper';
import UserManager from '../Services/entityManagers/users-manager.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export default class AuthService {

    constructor(private http: Http, private userManager: UserManager,
        private localStorage: LocalStorageService) { }

    signIn(username: string, password: string): Observable<User> {
        return httpHelper
            .processResponse(this.http.post('/signin', { username, password }))
            .mergeMap((id: string) => {
                return this.userManager.getOne(id);
            }).map((userData) => {
                console.log('save user data', userData);
                this.localStorage.set("user", userData);
                return userData;
            })
    }

    signOut(): Observable<boolean> {
        return httpHelper.processResponse(this.http.post('/signout', {}))
            .map((data) => {

                this.localStorage.remove('user');
                 return data;
            })
    }

    getUserData(): User {
        return this.localStorage.get<User>("user");
    }
}