import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserRepository } from 'src/app/models/user.repository';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})

export class UserComponent implements OnInit {
  user: User; // user obj to hold the logged in user
  userEditForm: FormGroup;

  constructor(private repo: UserRepository, public router: Router) {
    this.userEditForm = new FormGroup({
      name: new FormControl(),
      screenName: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.loggedInUser); //Store the loggedin user into the user obj
  }

  get users(): User[] {
    return this.repo.getUsers();
  }

  //Checks if the useredit form has any values inside of them and
  //if they have no values, leave the default values the same
  //if they have new values then change the editeduser's values to those values
  onSubmit(){ 
    let editedUser: User = this.user;
    if(this.userEditForm.get('name').value){
      editedUser.name = this.userEditForm.get('name').value;
    }

    if(this.userEditForm.get('screenName').value){
      editedUser.screenName = this.userEditForm.get('screenName').value;
    }

    if(this.userEditForm.get('password').value){
      editedUser.password = this.userEditForm.get('password').value;
    }

    console.log(editedUser);

    this.repo.editUser(editedUser);
  }

  //Removes the loggedin user from cache and redirects them to the login page
  async logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
