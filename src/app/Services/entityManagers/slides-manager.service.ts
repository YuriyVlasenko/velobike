import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import EntityManagerService from './entity-manager.service';
import Slide from '../../Model/slide';

const mapToEntity = (item) => {
    if (!item) {
        return null;
    }
    return new Slide(item.id, item.url, item.order);
}

@Injectable()
export default class SlidesManagerService extends EntityManagerService {

    constructor(http: Http) {
        super(http, 'slides');
    }

    getAll(useCache: boolean = false): Observable<Slide[]> {
        return super.getAll(useCache).map((items: any[]) => {
            return items.map(mapToEntity).sort((productA: Slide, productB: Slide) => {
                if (productA.order === productB.order) return 0;
                if (productA.order > productB.order) return 1;
                return -1;
            });
        });
    }

    getOne(id: string): Observable<Slide> {
        return super.getOne(id).map(mapToEntity);
    }
}