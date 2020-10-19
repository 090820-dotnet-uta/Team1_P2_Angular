import { Injectable, OnInit } from '@angular/core';
import { Blurb } from './blurb.model';
import { BlurbService } from '../services/blurb.service';
import { Observable } from 'rxjs';
import { FullQueryObj } from '../components/home/FullQueryObj';

@Injectable()
export class BlurbRepository implements OnInit {
  private blurbs: Blurb[] = [];

  constructor(private rest: BlurbService) {
    this.rest.getBlurbs().subscribe((data: any) => {
      this.blurbs = data;
      console.log(data);
    });
  }

  ngOnInit() {}

  getBlurb(id: number): Blurb {
    let b: Blurb;
    this.rest.getBlurb(id).subscribe((data: any) => {
      b = data;
    });
    return b;
  }

  getBlurbs(): Blurb[] {
    return this.blurbs;
  }

  getBlurbsByUser(
    fullQueryObj: FullQueryObj,
    id: number,
    byId: number
  ): Observable<Blurb[]> {
    return this.rest.getBlurbsByUser(fullQueryObj, id, byId);
  }

  addBlurb(blurb: Blurb): void {
    this.rest.addBlurb(blurb).subscribe((p) => console.log(p));
  }

  editBlurb(blurb: Blurb): void {
    this.rest.editBlurb(blurb).subscribe((p) => console.log(p));
  }

  fullQuery(fullQueryObj: FullQueryObj, id: number): Observable<Blurb[]> {
    return this.rest.fullQuery(fullQueryObj, id);
  }

  deleteBlurb(blurbId: number): Observable<boolean> {
    return this.rest.deleteBlurb(blurbId);
  }
}
