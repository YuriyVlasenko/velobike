import { Component, OnInit } from '@angular/core';
import User from '../../Model/user';
import AuthService from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public isSigninFailed: boolean = false;
  public loading: boolean = false;
  public user: User;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.user = new User();
  }

  login() {

    this.loading = true;

    this.authService.signIn(this.user.name, this.user.password)
      .subscribe((userData) => {

        this.loading = false;

        if (userData) {
          this.isSigninFailed = false;
          this.router.navigate(['/admin']);
        } else {
          this.isSigninFailed = true;
        }

      })
  }
}
