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

  public entity: any;

  @HostBinding('class.entity-editor') elementClass: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
    private edp: EntityDataProviderService) { }



  ngOnInit() {

    this.activatedRoute.params
      .switchMap((params: Params) => {
        if (params.entityId === 'create') {
          return Observable.from([null]);
        } 
        return this.edp.getEntity(params.entityType, params.entityId);
      })
      .subscribe((entities: any[]) => { this.entity = entities[0]; });
  
    }
}
