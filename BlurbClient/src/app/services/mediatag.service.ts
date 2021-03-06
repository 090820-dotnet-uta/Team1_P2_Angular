import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MediaTag } from '../models/mediatag.model';

@Injectable({
  providedIn: 'root',
})
export class MediaTagService {
  private BASE_URL: string = 'https://localhost:5001/api/mediatag/';
  private API_URL: string = 'https://blurbsapi.azurewebsites.net/api/mediatag/';

  constructor(private httpClient: HttpClient) {}

  getMediaTag(): Observable<MediaTag> {
    return this.httpClient.get<MediaTag>(this.API_URL + 'find');
  }

  getMediaTags(): Observable<MediaTag[]> {
    return this.httpClient.get<MediaTag[]>(this.API_URL + 'findAll');
  }
}
