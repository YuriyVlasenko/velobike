import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import EntityManagerService from './entity-manager.service';
import User from '../../Model/user';

const mapToEntity = (item) => {
    if (!item) {
        return null;
    }
    return new User(item.id, item.name);
}

@Injectable()
export default class UsersManagerService extends EntityManagerService {

    constructor(http: Http) {
        super(http, 'users');
    }

    getAll(): Observable<User[]> {
        return super.getAll().map((items: any[]) => {
            return items.map(mapToEntity);
        });
    }

    getOne(id: string): Observable<User> {
        return super.getOne(id).map(mapToEntity);
    }
}