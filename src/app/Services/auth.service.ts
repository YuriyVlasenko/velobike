import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import User from '../Model/user';
import httpHelper from '../Services/httpHelper';
import UserManager from '../Services/entityManagers/users-manager.service';

@Injectable()
export default class AuthService {

    constructor(private http: Http, private userManager: UserManager) { }

    signIn(username: string, password: string): Observable<User> {
        return httpHelper.processResponse(this.http.post('/signin', { username, password }))
            .mergeMap((id: string) => {
                return this.userManager.getOne(id);
            });
    }

    signOut(): Observable<boolean> {
        return httpHelper.processResponse(this.http.get('/signout'));
    }
}