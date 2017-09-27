import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import EntityDataProviderService from '../../../Services/entity-data-provider.service';
import IEntity from '../../../Model/IEntity';

@Component({
  selector: 'entity-items-list',
  templateUrl: './entity-items-list.component.html',
  styleUrls: ['./entity-items-list.component.scss']
})
export class EntityItemsListComponent implements OnInit {

  private entityType: string;
  public filterExpression: string;
  public entities: IEntity[];

  @HostBinding('class.entity-items-list') elementClass: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
    private edp: EntityDataProviderService,
    private router: Router) { }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe((params: Params) => {

        if (!params.entityType) {
          this.entityType = null;
          this.entities = [];
          return;
        }

        this.entityType = params.entityType;

        this.edp.getEntities(params.entityType)
          .subscribe((entitiesList) => {
            this.entities = entitiesList;
          });
      });
  }

  editItem(entityId: string) {
    this.router.navigate([entityId], { relativeTo: this.activatedRoute });
  }

  removeItem(entityId: string) {
    this.edp
      .deleteEntity(this.entityType, entityId)
      .subscribe((isComplete) => {
        if (isComplete) {
          this.entities = this.entities.filter((entity) => {
            return entity.id !== entityId;
          })
        }
      });
  }

  createItem() {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }
}
