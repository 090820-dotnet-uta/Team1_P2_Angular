import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

// Login should prompt them to login and redirect them to the seeblurbs page
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string;
  password: string;

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {}

  // Event listener for submitting the login form
  // Takes in a username and password and grabs
  //
  onSubmit() {
    let user = new User();
    user.username = this.username;
    user.password = this.password;

    // Place method to get a user with the same
    // username and password
  }
}
