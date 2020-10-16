import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

// Navebar should contain links to
// useredit page, logout, search, and see blurbs
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService, public router: Router) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated)
    );
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  // This should take in the user's id (Maybe in cookies?)
  // Uses the id to redirect them to the edit user page
  // Or the see user page
  RedirectProfile() {
    console.log('Not Implemented!');
  }

  // This should take in the user's list of followed users
  // and redirect them to the seeblurbs page
  RedirectBlurbs() {
    console.log('Not Implemented!');
  }

  // This should remove the user from the session
  // And bring them back to the login screen
  async Logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }

  // This should take in the user's input and search
  // the movie names for the blurbs or the users
  // Maybe split this into search users vs search
  // blurbs?
  SearchBlurb() {
    console.log('Not Implemented!');
  }
}
