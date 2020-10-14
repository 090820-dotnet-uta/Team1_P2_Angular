import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  // Takes in a username and password
  onSubmit() {
    console.log(this.loginForm.get('userName').value);
    console.log(this.loginForm.get('passWord').value);
  }
}
