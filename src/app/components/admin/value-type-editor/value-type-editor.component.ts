import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import ValueType from '../../../Model/valueType';
import EntityTypes from '../../../Services/entity-types';
import IEntity from '../../../Model/IEntity';
import EntityDataProvider from '../../../Services/entity-data-provider.service';

@Component({
  selector: 'value-type-editor',
  templateUrl: './value-type-editor.component.html',
  styleUrls: ['./value-type-editor.component.scss']
})
export class ValueTypeEditorComponent implements OnInit {

  public isCreating: boolean = false;

  @Input() entityData: ValueType;
  @Output() onChange = new EventEmitter<ValueType>();

  constructor(private edp: EntityDataProvider) { }

  ngOnInit() {
    this.isCreating = !this.entityData.id;
  }

  saveChanges() {
    this.onChange.emit(this.entityData);
  }
}
