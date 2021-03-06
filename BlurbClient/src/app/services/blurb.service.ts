import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blurb } from '../models/blurb.model';
import { FullQueryObj } from '../components/home/FullQueryObj';

@Injectable({
  providedIn: 'root',
})
export class BlurbService {
  private BASE_URL: string = 'https://localhost:5001/api/blurb/';
  private API_URL: string = 'https://blurbsapi.azurewebsites.net/api/blurb/';

  constructor(private httpClient: HttpClient) {}

  getBlurb(id: number): Observable<Blurb> {
    return this.httpClient.get<Blurb>(`${this.API_URL}find/${id}`);
  }

  getBlurbs(): Observable<Blurb[]> {
    return this.httpClient.get<Blurb[]>(this.API_URL + 'find/all');
  }

  getBlurbsByUser(
    fullQueryObj: FullQueryObj,
    id: number,
    byId: number
  ): Observable<Blurb[]> {
    return this.httpClient.post<Blurb[]>(
      `${this.API_URL}query/user/${id}/${byId}`,
      fullQueryObj
    );
  }

  addBlurb(blurb: Blurb): Observable<Blurb> {
    return this.httpClient.post<Blurb>(this.API_URL + 'add', blurb);
  }

  editBlurb(blurb: Blurb): Observable<Blurb> {
    return this.httpClient.put<Blurb>(this.API_URL + 'edit', blurb);
  }

  fullQuery(fullQueryObj: FullQueryObj, id: number): Observable<Blurb[]> {
    return this.httpClient.post<Blurb[]>(
      `${this.API_URL}fullquery/${id}`,
      fullQueryObj
    );
  }

  deleteBlurb(blurbId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.API_URL + `remove/${blurbId}`);
  }
}
