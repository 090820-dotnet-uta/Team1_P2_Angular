import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserRepository } from 'src/app/models/user.repository';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css'],
})
export class FollowersComponent implements OnInit {
  user: User;
  filtering = true;
  displayArr = [];
  followers: User[] = [];
  following: User[] = [];

  constructor(private userRepo: UserRepository) {
    this.user = localStorage.loggedInUser
      ? JSON.parse(localStorage.loggedInUser)
      : {};
    let x = JSON.parse(localStorage.loggedInUser);

    this.userRepo.getFollowers(this.user.userId).subscribe((f) => {
      this.followers = f;
    });
    this.userRepo.getFollowing(this.user.userId).subscribe((f) => {
      this.following = f;
      this.displayArr = f;
    });
  }

  toggleFilter() {
    this.filtering = !this.filtering;
    this.displayArr = this.filtering ? this.following : this.followers;
  }

  ngOnInit(): void {}
}
