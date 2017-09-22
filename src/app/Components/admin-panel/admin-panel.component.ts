import { Component, OnInit } from '@angular/core';
import AuthService from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  public activeUserName: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const userData = this.authService.getUserData();
    if (userData) {
      this.activeUserName = userData.name;
    }
  }

  logOut() {
    this.authService.signOut().subscribe((isLogouted) => {
      if (isLogouted) {
        this.activeUserName = null;
        this.router.navigate(['signin'])
      }
    });
  }

}
