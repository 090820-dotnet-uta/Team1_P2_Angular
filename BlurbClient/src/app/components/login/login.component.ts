import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// Login should prompt them to login and redirect them to the seeblurbs page
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userName: string;
  passWord: string;

  constructor() {
    this.loginForm = new FormGroup(
      {
        userName: new FormControl(),
        passWord: new FormControl()
      }
    )
   }

  ngOnInit(): void {
  }


  // Event listener for submitting the login form
  // Takes in a username and password and grabs
  // 
  onSubmit() {
    let user = new User();
    user.userName = this.userName;
    user.password = this.passWord;

    // Place method to get a user with the same
    // username and password
  }
}
