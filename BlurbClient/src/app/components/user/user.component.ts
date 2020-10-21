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
      password: new FormControl(),
    });

    if (!localStorage.loggedInUser) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
    this.user = localStorage.loggedInUser
      ? JSON.parse(localStorage.loggedInUser)
      : {};
  }

  get users(): User[] {
    return this.repo.getUsers();
  }

  //Checks if the useredit form has any values inside of them and
  //if they have no values, leave the default values the same
  //if they have new values then change the editeduser's values to those values
  onSubmit() {
    let editedUser: User = this.user;
    if (this.userEditForm.get('name').value) {
      editedUser.name = this.userEditForm.get('name').value;
    }

    if (this.userEditForm.get('screenName').value) {
      editedUser.screenName = this.userEditForm.get('screenName').value;
    }

    if (this.userEditForm.get('password').value) {
      editedUser.password = this.userEditForm.get('password').value;
    }

    delete editedUser.followers;
    delete editedUser.following;
    console.log(editedUser);

    this.repo.editUser(editedUser);
    this.updateLocalStorage(editedUser);
  }

  updateLocalStorage(editedUser: User) {
    let curUser: User = JSON.parse(localStorage.loggedInUser);
    curUser.name = editedUser.name;
    curUser.screenName = editedUser.screenName;
    curUser.password = editedUser.password;
    localStorage.loggedInUser = JSON.stringify(curUser);
  }

  //Removes the loggedin user from cache and redirects them to the login page
  async logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
