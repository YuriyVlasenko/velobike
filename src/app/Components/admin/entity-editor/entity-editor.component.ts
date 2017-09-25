import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.scss']
})
export class EntityEditorComponent implements OnInit {

  @HostBinding('class.entity-editor') elementClass: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
