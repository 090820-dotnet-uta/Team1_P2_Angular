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
  user: User;
  userEditForm: FormGroup;
  constructor(private repo: UserRepository, public router: Router) {
    this.userEditForm = new FormGroup({
      name: new FormControl(),
      screenName: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.loggedInUser);
    this.user.screenName
  }

  get users(): User[] {
    return this.repo.getUsers();
  }

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

  async logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
