import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})

// Edit user should let them change their display name, password, and privacy setting
export class EdituserComponent implements OnInit {

  user: User; // Makes an empty user
  EditUser: FormGroup;

  constructor() { }

  ngOnInit(): void {

    // This is dummy data to see if it works
    // Comment it out once we hook it up to the db
    this.user = new User()
    this.user.name = 'bob';
    this.user.screenName = 'bob';
    this.user.password = 'bob';

    //Establishes the form
    this.EditUser = new FormGroup(
      {
        name: new FormControl(),
        screenName: new FormControl(),
        passWord: new FormControl()
      }
    )
  }

  // This should edit the user in the db and change
  // their name, screen name, and password
  // but not their username
  onSubmit(){
    console.log("Not Implemented Yet!!!")
  }

}
