import { Injectable, OnInit } from '@angular/core';
import { Blurb } from './blurb.model';
import { BlurbService } from '../services/blurb.service';
import { Observable } from 'rxjs';

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

  // getBlurbsByUser(id: number): Blurb[] {
  //   return this.blurbs.filter((b) => b.userId == id);
  // }

  getBlurbsByUser(id: number): Observable<Blurb[]> {
    return this.rest.getBlurbsByUser(id);
  }

  addBlurb(blurb: Blurb): void {
    this.rest.addBlurb(blurb).subscribe((p) => console.log(p));
  }

  editBlurb(blurb: Blurb): void {
    this.rest.editBlurb(blurb).subscribe((p) => console.log(p));
  }
}
