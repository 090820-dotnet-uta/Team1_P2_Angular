import { Injectable, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserRepository implements OnInit {
  private users: User[] = [];
  private user: User;
  private success = false;

  constructor(private rest: UserService) {
    this.rest.getUsers().subscribe((data: any) => {
      this.users = data;
    });
    // this.rest.getUser().subscribe((data:any) => {
    //   this.user = data;
    // })
  }

  ngOnInit() {}

  getUser(id: number): Observable<User> {
    return this.rest.getUser(id);
  }

  getUsers(): User[] {
    return this.users;
  }

  loginUser(user: User): Observable<User> {
    return this.rest.loginUser(user);
  }

  addUser(user: User): void {
    this.rest.addUser(user).subscribe((p) => console.log(p));
  }

  // editUser(user: User): void {
  //   this.rest.editUser(user).subscribe((p) => console.log(p));
  // }

  //replacing all these with a single editUser method
  editUsername(user: User): void {
    this.rest.editUsername(user).subscribe((p) => console.log(p));
  }

  editScreename(user: User): void {
    this.rest.editScreename(user).subscribe((p) => console.log(p));
  }

  editName(user: User): void {
    this.rest.editName(user).subscribe((p) => console.log(p));
  }

  editPassword(user: User): void {
    this.rest.editPassword(user).subscribe((p) => console.log(p));
  }

  editUser(user: User): void {
    this.rest.editUser(user).subscribe((p) => console.log(p));
  }

  followUser(user: User, toFollowId: number): Observable<User> {
    return this.rest.followUser(user, toFollowId);
  }

  getFollowers(id: number): Observable<any[]> {
    return this.rest.getFollowers(id);
  }

  getFollowing(id: number): Observable<any[]> {
    return this.rest.getFollowing(id);
  }
}
