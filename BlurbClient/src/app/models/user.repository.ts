import { Injectable, OnInit } from "@angular/core";
import { User } from "./user.model";
import { RestService } from "../services/rest.service";

@Injectable()
export class UserRepository implements OnInit {
  private users: User[] = [];
  private user: User;

  constructor(private rest: RestService){
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

}