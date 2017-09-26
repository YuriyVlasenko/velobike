import { Component, OnInit, Input } from '@angular/core';
import ValueType from '../../../Model/valueType';

@Component({
  selector: 'value-type-editor',
  templateUrl: './value-type-editor.component.html',
  styleUrls: ['./value-type-editor.component.scss']
})
export class ValueTypeEditorComponent implements OnInit {

  @Input() entityData: ValueType;

  constructor() { }

  ngOnInit() {
  }

}
