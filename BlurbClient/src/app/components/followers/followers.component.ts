import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css'],
})
export class FollowersComponent implements OnInit {
  filtering = true;
  displayArr = [];
  dummyFollowersArr = [
    {
      name: 'bob',
      screenName: 'BobbyBoi',
      isFollowed: true,
    } as User,
    {
      name: 'jim',
      screenName: 'JimmyBoi',
      isFollowed: true,
    } as User,
    {
      name: 'al',
      screenName: 'AlBoi',
      isFollowed: true,
    } as User,
  ];
  dummyFollowingArr = [
    {
      name: 'bob2',
      screenName: 'BobbyBoi2',
      isFollowed: true,
    } as User,
    {
      name: 'jim2',
      screenName: 'JimmyBoi2',
      isFollowed: true,
    } as User,
    {
      name: 'al2',
      screenName: 'AlBoi2',
      isFollowed: true,
    } as User,
  ];

  constructor() {}

  toggleFilter() {
    this.filtering = !this.filtering;
    !this.filtering
      ? (this.displayArr = this.dummyFollowingArr)
      : (this.displayArr = this.dummyFollowersArr);
  }

  ngOnInit(): void {
    this.displayArr = this.dummyFollowersArr;
  }
}
