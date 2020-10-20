import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRepository } from 'src/app/models/user.repository';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

// Signup should add a new user and sign them in
export class SignupComponent implements OnInit {
  user: FormGroup;

  constructor(private userRepo: UserRepository, private router: Router) {}

  ngOnInit(): void {
    this.user = new FormGroup({
      name: new FormControl(),
      screenName: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
    });

    if (localStorage.loggedInUser) {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit() {
    this.userRepo.addUser(this.user.value);
    this.router.navigateByUrl('/login');
  }
}
