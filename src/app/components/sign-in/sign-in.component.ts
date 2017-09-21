import { Component, OnInit } from '@angular/core';
import User from '../../Model/user';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public loading: boolean = false;
  public user: User;

  constructor() { }

  ngOnInit() {
    this.user = new User();
  }

  login(){
    console.log('login for ', this.user);
    //this.loading = true;
  }

}
