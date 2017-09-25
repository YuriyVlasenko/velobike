import { Component, OnInit } from '@angular/core';

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
      new EntityTypeItem('categories', 'Категории'),
      new EntityTypeItem('parameters', 'Параметры'),
      new EntityTypeItem('valueTypes', 'Типы данных'),
      new EntityTypeItem('products', 'Товары'),
      new EntityTypeItem('users', 'Пользователи'),
      new EntityTypeItem('contactInformation', 'Контактная информация')
    ];
  }

  ngOnInit() {
  }
}