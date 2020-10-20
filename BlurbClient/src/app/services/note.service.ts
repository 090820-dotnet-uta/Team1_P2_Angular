import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private BASE_URL: string = 'https://localhost:5001/api/note/';
  private API_URL: string = 'https://blurbsapi.azurewebsites.net/api/note/';

  constructor(private httpClient: HttpClient) {}

  getNote(): Observable<Note> {
    return this.httpClient.get<Note>(this.API_URL + 'find');
  }

  getNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(this.API_URL + 'findAll');
  }
}
