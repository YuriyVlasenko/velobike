import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import EntityManagerService from './entity-manager.service';
import ContactInformation from '../../Model/contactInformation';

const mapToEntity = (item) => {
  return new ContactInformation(item.id, item.phones, item.workTime,
    item.slogan, item.deliveryPageContent, item.mainPageContent);
}

@Injectable()
export default class ContactInformationService extends EntityManagerService {

  constructor(http: Http) {
    super(http, 'contactInformation');
  }

  getAll(): Observable<ContactInformation[]> {
    return super.getAll().map((items: any[]) => {
      return items.map(mapToEntity);
    });
  }

  getOne(id: string): Observable<ContactInformation> {
    return super.getOne(id).map(mapToEntity);
  }
}
