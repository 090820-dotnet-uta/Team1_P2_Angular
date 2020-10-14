import { Injectable, OnInit } from "@angular/core";
import { Media } from "./media.model";
import { MediaService } from "../services/media.service";

@Injectable()
export class MediaRepository implements OnInit {
  private medias: Media[] = [];
  private media: Media;

  constructor(private rest: MediaService){
    this.rest.getMedias().subscribe((data: any) => {
      this.medias = data;
    });
    this.rest.getMedia().subscribe((data:any) => {
      this.media = data;
    })
  }

  ngOnInit() {

  }
  getMedia(): Media {
    return this.media;
  }

  getMedias(): Media[] {
    return this.medias;
  }

}