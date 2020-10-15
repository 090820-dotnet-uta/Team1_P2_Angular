import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

// Navebar should contain links to
// useredit page, logout, search, and see blurbs
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

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
  Logout() {
    console.log('Not Implemented!');
  }

  // This should take in the user's input and search
  // the movie names for the blurbs or the users
  // Maybe split this into search users vs search
  // blurbs?
  SearchBlurb() {
    console.log('Not Implemented!');
  }
}
