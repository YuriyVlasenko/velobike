import { Component, OnInit, Input } from '@angular/core';
import Parameter from '../../../Model/parameter';

@Component({
  selector: 'parameter-editor',
  templateUrl: './parameter-editor.component.html',
  styleUrls: ['./parameter-editor.component.scss']
})
export class ParameterEditorComponent implements OnInit {

  @Input() entityData: Parameter;

  constructor() { }

  ngOnInit() {
  }

}
