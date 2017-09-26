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

  public filterExpression: string;
  public entities: IEntity[];

  @HostBinding('class.entity-items-list') elementClass: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
    private edp: EntityDataProviderService,
    private router: Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {

      if (!params.entityType) {
        this.entities = [];
        return;
      }

      this.edp.getEntities(params.entityType).subscribe((entitiesList) => {
        this.entities = entitiesList;
      });
    });
  }

  editItem(entityId: string) {
    this.router.navigate([entityId], { relativeTo: this.activatedRoute });
  }

  removeItem(entityId: string) {
    console.log('remove item', entityId);
  }

  createItem(){
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }
}
