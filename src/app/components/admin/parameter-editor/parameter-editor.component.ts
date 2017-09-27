import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Parameter from '../../../Model/parameter';
import EntityDataProvider from '../../../Services/entity-data-provider.service';
import EntityTypes from '../../../Services/entity-types';
import IEntity from '../../../Model/IEntity';

@Component({
  selector: 'parameter-editor',
  templateUrl: './parameter-editor.component.html',
  styleUrls: ['./parameter-editor.component.scss']
})
export class ParameterEditorComponent implements OnInit {

  @Input() entityData: Parameter;
  @Output() onChange = new EventEmitter<Parameter>();

  public valueTypesList: IEntity[];
  public isCreating: boolean = false;

  constructor(private edp: EntityDataProvider) { }

  ngOnInit() {
    this.isCreating = !this.entityData.id;

    this.edp
      .getEntities(EntityTypes.VALUE_TYPES.Name)
      .subscribe((entities: IEntity[]) => {
        this.valueTypesList = entities;
      });
  }

  saveChanges() {
    this.onChange.emit(this.entityData);
  }
}
