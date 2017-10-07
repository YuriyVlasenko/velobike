import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import {Router} from '@angular/router';


@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {


  @Output() onSearch = new EventEmitter<string>();

  public searchExpression: string;

  constructor(private router:  Router) { }

  ngOnInit() {
  }

  search() {
    this.router.navigate(['search', this.searchExpression]);
  }
}
