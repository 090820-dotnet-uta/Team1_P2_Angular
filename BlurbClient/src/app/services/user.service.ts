import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL: string = 'https://localhost:5001/api/user/';
  private API_URL: string = 'https://blurbsapi.azurewebsites.net/api/user/';

  constructor(private httpClient: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.API_URL}find/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API_URL + 'find/all');
  }

  loginUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL + 'login', user);
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL + 'add', user);
  }

  // editUser(user: User): Observable<User> {
  //   return this.httpClient.put<User>(this.BASE_URL + 'edit', user);
  // }

  //replacing all these with a single editUser method
  editUsername(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL + 'edit/username', user);
  }

  editScreename(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL + 'edit/screenname', user);
  }

  editName(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL + 'edit/name', user);
  }

  editPassword(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL + 'edit/password', user);
  }

  setUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL + 'add', user);
  }

  editUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.API_URL + 'edit/user', user);
  }

  followUser(user: User, toFollowId: number): Observable<User> {
    return this.httpClient.post<User>(
      `${this.API_URL}follow/${toFollowId}`,
      user
    );
  }

  unfollowUser(user: User, toUnfollowId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${this.API_URL}remove/follow/${user.userId}/${toUnfollowId}`
    );
  }

  getFollowers(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_URL}find/all/follower/${id}`);
  }

  getFollowing(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.API_URL}find/all/following/${id}`
    );
  }
}
