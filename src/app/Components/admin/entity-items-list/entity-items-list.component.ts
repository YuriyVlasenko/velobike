import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'entity-items-list',
  templateUrl: './entity-items-list.component.html',
  styleUrls: ['./entity-items-list.component.scss']
})
export class EntityItemsListComponent implements OnInit {

  @HostBinding('class.entity-items-list') elementClass: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
 