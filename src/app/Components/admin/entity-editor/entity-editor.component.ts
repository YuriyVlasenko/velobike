import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import EntityDataProviderService from '../../../Services/entity-data-provider.service';

@Component({
  selector: 'entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.scss']
})
export class EntityEditorComponent implements OnInit {

  public entityType: string;
  public entity: any;

  @HostBinding('class.entity-editor') elementClass: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
    private edp: EntityDataProviderService) { }

  ngOnInit() {

    this.activatedRoute.params
      .switchMap((params: Params) => {
        this.entityType = params.entityType;

        if (params.entityId === 'create') {
          return Observable.from([]);
        }
        return this.edp.getEntity(params.entityType, params.entityId);
      })
      .subscribe((entity: any) => {

        if (entity.id) {
          // TODO: create new instance
        }
        else {
          // TODO: change instance
        }


        this.entity = entity;
      });

  }
}
