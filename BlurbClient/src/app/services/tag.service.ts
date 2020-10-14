import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tag } from "../models/tag.model";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private BASE_URL: string = "https://localhost:5001/api/tag/";

  constructor(private httpClient: HttpClient) { }

  getTag(): Observable<Tag> {
    return this.httpClient.get<Tag>(
      this.BASE_URL + "find"
    );
  }

  getTags(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(
      this.BASE_URL + "findAll"
    );
  }
}