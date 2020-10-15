import { Injectable, OnInit } from "@angular/core";
import { User } from "./user.model";
import { UserService } from "../services/user.service";

@Injectable()
export class UserRepository implements OnInit {
  private users: User[] = [];
  private user: User;

  constructor(private rest: UserService){
    this.rest.getUsers().subscribe((data: any) => {
      this.users = data;
    });
    this.rest.getUser().subscribe((data:any) => {
      this.user = data;
    })
  }

  ngOnInit() {

  }
  getUser(): User {
    return this.user;
  }

  getUsers(): User[] {
    return this.users;
  }

  setUser(user: User): void {
    this.rest.setUser(user).subscribe(u => console.log(u));
  }

}