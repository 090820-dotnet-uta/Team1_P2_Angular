import { Injectable, OnInit } from "@angular/core";
import { Blurb } from "./blurb.model";
import { BlurbService } from "../services/blurb.service";

@Injectable()
export class BlurbRepository implements OnInit {
  private blurbs: Blurb[] = [];
  private blurb: Blurb;

  constructor(private rest: BlurbService){
    this.rest.getBlurbs().subscribe((data: any) => {
      this.blurbs = data;
    });
    this.rest.getBlurb().subscribe((data:any) => {
      this.blurb = data;
    })
  }

  ngOnInit() {

  }
  getBlurb(): Blurb {
    return this.blurb;
  }

  getBlurbs(): Blurb[] {
    return this.blurbs;
  }

}