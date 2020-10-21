import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  name: string;
  screenName: string;
  username: string;
  password: string;
  usernameIsTaken: boolean = false;

  constructor(private userRepo: UserRepository, private router: Router) {}

  ngOnInit(): void {
    this.user = new FormGroup({
      name: new FormControl(this.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      screenName: new FormControl(this.screenName, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      username: new FormControl(this.username, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
    });

    if (localStorage.loggedInUser) {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit() {
    if (this.user.invalid) return;

    this.userRepo.addUser(this.user.value).subscribe((u) => {
      if (u.userId == 0) {
        this.usernameIsTaken = true;
        return;
      } else this.router.navigateByUrl('/login');
    });
  }
}
