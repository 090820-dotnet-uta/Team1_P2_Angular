import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router, NavigationStart } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { UserRepository } from 'src/app/models/user.repository';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

// Login should prompt them to login and redirect them to the seeblurbs page
export class LoginComponent implements OnInit {
  signIn;
  widget = new OktaSignIn({
    baseUrl: 'https://dev-5859084.okta.com/oauth2/default',
    clientId: '0oaatkg49eXgLauJt5d5',
    authParams: {
      pkce: true,
    },
    features: {
      registration: true, // REQUIRED
    },
  });

  loginForm: FormGroup;
  username: string;
  password: string;

  constructor(
    private oktaAuth: OktaAuthService,
    private router: Router,
    private userRepo: UserRepository
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });

    this.signIn = oktaAuth;

    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/login':
            break;
          case '/protected':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });
  }

  ngOnInit(): void {
    this.widget.renderEl(
      {
        el: '#okta-signin-container',
      },
      (res) => {
        if (res.status === 'SUCCESS') {
          this.signIn.loginRedirect('/', { sessionToken: res.session.token });
          // Hide the widget
          this.widget.hide();
        }
      },
      (err) => {
        throw err;
      }
    );
  }

  afterSubmit(u: any) {
    if (localStorage.loggedInUser) {
      console.log(localStorage.loggedInUser);
      console.log(localStorage.followers);
      this.router.navigateByUrl('/home');
    } else console.log('failed to log in');
    setTimeout(() => {
      let x = JSON.parse(localStorage.loggedInUser);
      let y = JSON.parse(localStorage.followers);
      let z = JSON.parse(localStorage.following);
      x.followers = y;
      x.following = z;
      localStorage.clear();
      localStorage.loggedInUser = JSON.stringify(x);
    }, 300);
  }

  // Event listener for submitting the login form
  // Takes in a username and password and grabs
  //
  onSubmit() {
    // Place method to get a user with the same
    // username and password
    this.userRepo.loginUser(this.loginForm.value).subscribe((u) => {
      if ('userId' in u) {
        this.userRepo.getFollowers(u.userId).subscribe((f) => {
          console.log(f);
          localStorage.followers = JSON.stringify(f);
        });
        this.userRepo.getFollowing(u.userId).subscribe((f) => {
          console.log(f);
          localStorage.following = JSON.stringify(f);
        });
        localStorage.loggedInUser = JSON.stringify(u);
      }
      this.afterSubmit(u);
    });
  }
}
