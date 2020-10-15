import { Injectable, OnInit } from '@angular/core';
import { Blurb } from './blurb.model';
import { BlurbService } from '../services/blurb.service';

@Injectable()
export class BlurbRepository implements OnInit {
  private blurbs: Blurb[] = [];

  constructor(private rest: BlurbService) {
    this.rest.getBlurbs().subscribe((data: any) => {
      this.blurbs = data;
      console.log(data);
    });
    // this.rest.getBlurb().subscribe((data:any) => {
    //   this.blurb = data;
    // })
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
}
