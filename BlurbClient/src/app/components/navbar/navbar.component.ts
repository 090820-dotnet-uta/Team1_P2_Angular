import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

// Navebar should contain links to
// useredit page, logout, search, and see blurbs
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean;
  user: User = localStorage.loggedInUser
    ? JSON.parse(localStorage.loggedInUser)
    : {};

  constructor(public oktaAuth: OktaAuthService, public router: Router) {
    this.user = localStorage.loggedInUser
      ? JSON.parse(localStorage.loggedInUser)
      : {};
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated)
    );

    // Listend for route changed to assign this.user for passing to viewuser route on navbar routerlink
    this.router.events.subscribe((event: any) => {
      this.user = localStorage.loggedInUser
        ? JSON.parse(localStorage.loggedInUser)
        : {};
    });
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.user = localStorage.loggedInUser
      ? JSON.parse(localStorage.loggedInUser)
      : {};
  }
}
