import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import EntityManagerService from './entity-manager.service';
import ContactInformation from '../../Model/contactInformation';

const mapToContactInformation = (item) => {
  return new ContactInformation(item.id, item.phones, item.workTime, item.slogan);
}

@Injectable()
export default class ContactInformationService extends EntityManagerService {

  constructor(http: Http) {
    super(http, 'contactInformation');
  }

  getAll(): Observable<ContactInformation[]> {
    return super.getAll().map((items: any[]) => {
      return items.map(mapToContactInformation);
    });
  }

  getOne(id: string): Observable<ContactInformation> {
    return super.getOne(id).map(mapToContactInformation);
  }
}
