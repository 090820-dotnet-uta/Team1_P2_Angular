import { Injectable, OnInit } from "@angular/core";
import { MediaTag } from "./mediatag.model";
import { MediaTagService } from "../services/mediatag.service";

@Injectable()
export class MediaTagRepository implements OnInit {
  private mediaTags: MediaTag[] = [];
  private mediaTag: MediaTag;

  constructor(private rest: MediaTagService){
    this.rest.getMediaTags().subscribe((data: any) => {
      this.mediaTags = data;
    });
    this.rest.getMediaTag().subscribe((data:any) => {
      this.mediaTag = data;
    })
  }

  ngOnInit() {

  }
  getMediaTag(): MediaTag {
    return this.mediaTag;
  }

  getMediaTags(): MediaTag[] {
    return this.mediaTags;
  }

}