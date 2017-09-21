import { Component, OnInit } from '@angular/core';
import User from '../../Model/user';
import AuthService from '../../Services/auth.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public loading: boolean = false;
  public user: User;

  constructor(private authService: AuthService, private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.user = new User();
  }

  login() {

    this.authService.signIn(this.user.name, this.user.password) 
      .subscribe((userData) => {
          localStorage.setItem("userName", userData.id);
      })
    }
}
