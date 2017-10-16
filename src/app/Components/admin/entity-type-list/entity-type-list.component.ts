import { Component, OnInit } from '@angular/core';
import entityTypes from '../../../Services/entity-types';

class EntityTypeItem {

  constructor(public Name: string, public DisplayName: string) { }

}

@Component({
  selector: 'entity-type-list',
  templateUrl: './entity-type-list.component.html',
  styleUrls: ['./entity-type-list.component.scss']
})

export class EntityTypeListComponent implements OnInit {

  public entityTypes: EntityTypeItem[];

  constructor() {
  this.entityTypes = [
      entityTypes.CATEGORIES,
      entityTypes.PARAMETERS,
      entityTypes.VALUE_TYPES,
      entityTypes.PRODUCTS,
      entityTypes.SLIDES,
      entityTypes.USERS,
      entityTypes.CONTACT_INFORMATION,
    ];
  }

  ngOnInit() {
  }
}