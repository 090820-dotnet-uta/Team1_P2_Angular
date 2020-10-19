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

  constructor(private httpClient: HttpClient) {}

  getBlurb(id: number): Observable<Blurb> {
    return this.httpClient.get<Blurb>(`${this.BASE_URL}find/${id}`);
  }

  getBlurbs(): Observable<Blurb[]> {
    return this.httpClient.get<Blurb[]>(this.BASE_URL + 'find/all');
  }

  getBlurbsByUser(
    fullQueryObj: FullQueryObj,
    id: number,
    byId: number
  ): Observable<Blurb[]> {
    return this.httpClient.post<Blurb[]>(
      `${this.BASE_URL}query/user/${id}/${byId}`,
      fullQueryObj
    );
  }

  addBlurb(blurb: Blurb): Observable<Blurb> {
    return this.httpClient.post<Blurb>(this.BASE_URL + 'add', blurb);
  }

  editBlurb(blurb: Blurb): Observable<Blurb> {
    return this.httpClient.put<Blurb>(this.BASE_URL + 'edit', blurb);
  }

  fullQuery(fullQueryObj: FullQueryObj, id: number): Observable<Blurb[]> {
    return this.httpClient.post<Blurb[]>(
      `${this.BASE_URL}fullquery/${id}`,
      fullQueryObj
    );
  }
}
