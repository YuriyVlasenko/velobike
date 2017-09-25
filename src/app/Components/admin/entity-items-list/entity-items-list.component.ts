import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import EntityDataProviderService from '../../../Services/entity-data-provider.service';

@Component({
  selector: 'entity-items-list',
  templateUrl: './entity-items-list.component.html',
  styleUrls: ['./entity-items-list.component.scss']
})
export class EntityItemsListComponent implements OnInit {

  @HostBinding('class.entity-items-list') elementClass: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, 
  private edp: EntityDataProviderService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {

      if (params.entityType){

        // load list of all entities for {{params.entityType}}

      } else{

      }

    });

  }

}
