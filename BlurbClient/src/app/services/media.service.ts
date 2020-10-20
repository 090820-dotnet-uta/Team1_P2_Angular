import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Media } from '../models/media.model';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private BASE_URL: string = 'https://localhost:5001/api/media/';
  private API_URL: string = 'https://blurbsapi.azurewebsites.net/api/media/';

  constructor(private httpClient: HttpClient) {}

  getMedia(): Observable<Media> {
    return this.httpClient.get<Media>(this.API_URL + 'find');
  }

  getMedias(): Observable<Media[]> {
    return this.httpClient.get<Media[]>(this.API_URL + 'findAll');
  }
}
