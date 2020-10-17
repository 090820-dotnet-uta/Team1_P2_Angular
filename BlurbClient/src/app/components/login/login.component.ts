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

  // Event listener for submitting the login form
  // Takes in a username and password and grabs
  //
  async onSubmit() {
    // let user = new User();
    // user.username = this.username;
    // user.password = this.password;

    // Place method to get a user with the same
    // username and password
    this.userRepo.loginUser(this.loginForm.value);
  }
}
