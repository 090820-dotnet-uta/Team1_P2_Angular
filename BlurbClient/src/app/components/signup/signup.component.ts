import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserRepository } from "../../models/user.repository";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

// Signup should add a new user and sign them in
export class SignupComponent implements OnInit {
  signinForm: FormGroup;

  // Im assuming the form only taks a username and password
  userName: string;
  passWord: string;

  constructor(private userrepo : UserRepository) {
    
   }

  ngOnInit(): void {
    //Creates the form
    this.signinForm = new FormGroup(
      {
        userName: new FormControl(),
        passWord: new FormControl()
      }
    )
  }

  // This should create a user obj storing the username
  // and password into the user and returning it to the db
  onSubmit(){
    let user = new User();
    user.userName = this.userName;
    user.name = this.userName;
    user.password = this.passWord;
    user.screenName = this.userName;

    //Use method for posting the user to the service
    this.userrepo.setUser(user);
  }

}
