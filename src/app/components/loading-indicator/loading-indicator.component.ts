import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']  
})
export class LoadingIndicatorComponent implements OnInit {

  @HostBinding('class.loading-indicator') componentClass: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
