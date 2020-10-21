import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

import { UserRepository } from 'src/app/models/user.repository';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

// Login should prompt them to login and redirect them to the seeblurbs page
export class LoginComponent implements OnInit {
  user: User;

  loginForm: FormGroup;
  username: string;
  password: string;

  constructor(private router: Router, private userRepo: UserRepository) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(this.username, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
    });

    if (localStorage.loggedInUser) {
      this.router.navigateByUrl('/home');
    }
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
    console.log(this.loginForm.invalid);
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
