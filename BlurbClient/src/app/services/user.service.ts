import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL: string = "https://localhost:5001/api/user/";

  constructor(private httpClient: HttpClient) { }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(
      this.BASE_URL + "find"
    );
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(
      this.BASE_URL + "findAll"
    );
  }
}
