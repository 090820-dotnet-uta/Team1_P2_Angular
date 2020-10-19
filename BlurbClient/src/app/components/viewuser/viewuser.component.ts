import { Component, OnInit } from '@angular/core';
import { Blurb } from 'src/app/models/blurb.model';
import { BlurbRepository } from 'src/app/models/blurb.repository';
import { User } from 'src/app/models/user.model';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRepository } from 'src/app/models/user.repository';
import { CalcBkgColor } from '../../StaticFunctions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css'],
})
export class ViewuserComponent implements OnInit {
  user: User = {};
  currentUser: User = JSON.parse(localStorage.loggedInUser);
  blurbsByUserArr = [];
  isFollowing = false;
  lazyLoad = true;

  calcBkgColor = CalcBkgColor;

  moment = moment;

  constructor(
    private blurbRepo: BlurbRepository,
    private userRepo: UserRepository,
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe((p) => {
      this.blurbRepo
        .getBlurbsByUser(p['id'])
        .subscribe((b) => (this.blurbsByUserArr = b));
      console.log(p['id']);
      this.userRepo.getUser(p['id']).subscribe((u) => {
        this.user = u;
        console.log('running');
      });
    });
    this.checkFollow();
  }

  ngOnInit(): void {}

  checkFollow() {
    setTimeout(() => {
      console.log(this.currentUser);
      this.isFollowing = this.currentUser.following.includes(this.user.userId);
      console.log(this.isFollowing);
      this.lazyLoad = !this.lazyLoad;
    }, 160);
  }

  handleFollow() {
    console.log(`person to follow ${this.user.username}`);
    console.log(`person doing the follow ${this.currentUser.username}`);
    console.log(this.isFollowing);
    //this.userRepo.followUser(this.currentUser, this.user.userId).subscribe((c => console.log(c)));
  }
  handleUnfollow() {
    console.log(`person to unfollow ${this.user.username}`);
    console.log(`person doing the unfollow ${this.currentUser.username}`);
    console.log(this.isFollowing);
    //this.userRepo.unfollowUser(this.currentUser, this.user.userId).subscribe((c => console.log(c)));
  }
}
