import { Component, OnInit } from '@angular/core';
import { Blurb } from 'src/app/models/blurb.model';
import { BlurbRepository } from 'src/app/models/blurb.repository';
import { User } from 'src/app/models/user.model';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRepository } from 'src/app/models/user.repository';
import { CalcBkgColor, GetTypeIcon, Logout } from '../../StaticFunctions';
import { Observable } from 'rxjs';
import { Settings } from '../home/Settings';
import { FullQueryObj } from '../home/FullQueryObj';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css'],
})
export class ViewuserComponent implements OnInit {
  user: User = {};
  currentUser: User = localStorage.loggedInUser
    ? JSON.parse(localStorage.loggedInUser)
    : {};
  blurbsByUserArr = [];
  isFollowing = false;
  lazyLoad = true;
  filterSettingsVisible = false;
  canFetchMoreBlurbs: boolean = true;
  getTypeIcon = GetTypeIcon;
  logout = Logout;
  followers: User[] = [];
  following: User[] = [];
  avatarLetter: string = '';

  sortSettings: Settings = new Settings(
    0, //0 is sort by most recent
    true,
    true,
    true,
    true,
    true,
    true,
    true
  );
  fullQueryObj: FullQueryObj = new FullQueryObj(this.sortSettings, -1, 10); //SinceId = -1 because -1 makes you start at the beginning

  calcBkgColor = CalcBkgColor;

  moment = moment;

  constructor(
    private blurbRepo: BlurbRepository,
    private userRepo: UserRepository,
    private router: ActivatedRoute,
    private router2: Router
  ) {
    this.currentUser = localStorage.loggedInUser
      ? JSON.parse(localStorage.loggedInUser)
      : {};

    if (!localStorage.loggedInUser) {
      this.router2.navigateByUrl('/login');
    }

    this.router.params.subscribe((p) => {
      this.userRepo.getUser(p['id']).subscribe((u) => {
        this.user = u;
        this.avatarLetter = u.username[0].toUpperCase();
        this.userRepo.getFollowers(u.userId).subscribe((f) => {
          this.followers = f;
          console.log(`followers list: `, f);
        });
        this.userRepo
          .getFollowing(u.userId)
          .subscribe((f) => (this.following = f));
        console.log('running');
        this.blurbRepo
          .getBlurbsByUser(this.fullQueryObj, p['id'], this.user.userId)
          .subscribe((b) => (this.blurbsByUserArr = b));
        console.log(p['id']);
      });
    });
    this.checkFollow();
  }

  //Initialize the followers and following lists
  ngOnInit(): void {}

  followUtil(f: boolean) {
    console.log(`person to follow ${this.user.username}`);
    console.log(`person doing the follow ${this.currentUser.username}`);
    console.log(this.isFollowing);

    if (f) {
      this.userRepo
        .followUser(this.currentUser, this.user.userId)
        .subscribe((c) => {
          console.log(c);
          this.userRepo.getFollowers(this.currentUser.userId).subscribe((f) => {
            console.log(f);
            localStorage.followers = JSON.stringify(f);
          });
          this.userRepo.getFollowing(this.currentUser.userId).subscribe((f) => {
            console.log(f);
            localStorage.following = JSON.stringify(f);
          });
        });
    } else {
      this.userRepo
        .unfollowUser(this.currentUser, this.user.userId)
        .subscribe((c) => {
          console.log(c);
          this.userRepo.getFollowers(this.currentUser.userId).subscribe((f) => {
            console.log(f);
            localStorage.followers = JSON.stringify(f);
            this.followers = f;
          });
          this.userRepo.getFollowing(this.currentUser.userId).subscribe((f) => {
            console.log(f);
            localStorage.following = JSON.stringify(f);
            this.following = f;
          });
        });
    }

    setTimeout(() => {
      let x = JSON.parse(localStorage.loggedInUser);
      let y = JSON.parse(localStorage.followers);
      let z = JSON.parse(localStorage.following);
      x.followers = y;
      x.following = z;
      localStorage.clear();
      localStorage.loggedInUser = JSON.stringify(x);
      console.log('Loading new localstore data', localStorage.loggedInUser);
    }, 500);
    this.isFollowing = f;
  }

  checkFollow() {
    setTimeout(() => {
      console.log(this.currentUser);
      this.isFollowing =
        this.currentUser.following.filter((b) => b.userId == this.user.userId)
          .length > 0;
      console.log(this.isFollowing);
      this.lazyLoad = !this.lazyLoad;
    }, 160);
  }

  handleFollow() {
    this.followUtil(true);
  }
  handleUnfollow() {
    this.followUtil(false);
  }

  //not used anymore
  toggleFilterSettingsVisible() {
    this.filterSettingsVisible = !this.filterSettingsVisible;
  }

  updateSortSetting(setting: number) {
    if (Number.isInteger(setting) && setting >= 0 && setting <= 3) {
      this.sortSettings.sortSetting = setting;
      this.fullQueryObj.updateSettings(this.sortSettings);
      this.fullQueryObj.sinceId = -1;
      this.blurbRepo
        .getBlurbsByUser(
          this.fullQueryObj,
          this.currentUser.userId,
          this.user.userId
        )
        .subscribe((p) => {
          this.blurbsByUserArr = p;
          console.log(`blurbs array: ${p}`);
        });
    }
  }

  toggleMovieFilter() {
    this.sortSettings.includeMovies = !this.sortSettings.includeMovies;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.fullQueryObj.sinceId = -1;
    this.blurbRepo
      .getBlurbsByUser(
        this.fullQueryObj,
        this.currentUser.userId,
        this.user.userId
      )
      .subscribe((p) => {
        this.blurbsByUserArr = p;
        console.log(`blurbs array: ${p}`);
      });
  }

  toggleGamesFilter() {
    this.sortSettings.includeGames = !this.sortSettings.includeGames;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.fullQueryObj.sinceId = -1;
    this.blurbRepo
      .getBlurbsByUser(
        this.fullQueryObj,
        this.currentUser.userId,
        this.user.userId
      )
      .subscribe((p) => {
        this.blurbsByUserArr = p;
        console.log(`blurbs array: ${p}`);
      });
  }

  toggleTVFilter() {
    this.sortSettings.includeTV = !this.sortSettings.includeTV;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.fullQueryObj.sinceId = -1;
    this.blurbRepo
      .getBlurbsByUser(
        this.fullQueryObj,
        this.currentUser.userId,
        this.user.userId
      )
      .subscribe((p) => {
        this.blurbsByUserArr = p;
        console.log(`blurbs array: ${p}`);
      });
  }

  toggleBooksFilter() {
    this.sortSettings.includeBooks = !this.sortSettings.includeBooks;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.fullQueryObj.sinceId = -1;
    this.blurbRepo
      .getBlurbsByUser(
        this.fullQueryObj,
        this.currentUser.userId,
        this.user.userId
      )
      .subscribe((p) => {
        this.blurbsByUserArr = p;
        console.log(`blurbs array: ${p}`);
      });
  }

  //Sets the sinceId in the full query object to a given since Id
  //Provided that the sinceId exists in the current list of blurbs
  setSinceId(sinceId: number): boolean {
    if (Number.isInteger(sinceId)) {
      this.fullQueryObj.sinceId = sinceId;
      return true;
    }
    return false;
  }

  //Adds the next 10 blurbs to the currently loaded list
  loadBlurbs(span: number) {
    var sinceIdOk = this.setSinceId(
      this.blurbsByUserArr[this.blurbsByUserArr.length - 1].blurbId
    );
    console.log(
      `sinceId is: ${this.fullQueryObj.sinceId}, and it is: ${sinceIdOk}`
    );
    if (Number.isInteger(span) && span > 0 && sinceIdOk) {
      this.canFetchMoreBlurbs = false;
      this.blurbRepo
        .getBlurbsByUser(
          this.fullQueryObj,
          this.currentUser.userId,
          this.user.userId
        )
        .subscribe((p) => {
          console.log(p);
          this.blurbsByUserArr = this.blurbsByUserArr.concat(p);
          this.canFetchMoreBlurbs = true;
        });
    }
  }

  handleClick() {
    this.logout(this.router2);
  }
}
