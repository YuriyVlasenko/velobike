import { Component, OnInit, Output, EventEmitter } from '@angular/core'


@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {


  @Output() onSearch = new EventEmitter<string>();

  public searchExpression: string;

  constructor() { }

  ngOnInit() {
  }

  search() {
    this.onSearch.emit(this.searchExpression);
  }

}
