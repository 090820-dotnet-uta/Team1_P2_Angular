import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blurb } from '../models/blurb.model';

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
}
