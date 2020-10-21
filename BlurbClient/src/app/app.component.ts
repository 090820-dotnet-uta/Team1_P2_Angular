import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  //Return true if there's a user logged in, false if there's not
  userLoggedIn(): boolean {
    console.log('logged in user: ', localStorage.loggedInUser);
    if (localStorage.loggedInUser) {
      return true;
    } else {
      return false;
    }
  }
}
