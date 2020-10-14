import { Injectable, OnInit } from "@angular/core";
import { Tag } from "./tag.model";
import { TagService } from "../services/tag.service";

@Injectable()
export class TagRepository implements OnInit {
  private tags: Tag[] = [];
  private tag: Tag;

  constructor(private rest: TagService){
    this.rest.getTags().subscribe((data: any) => {
      this.tags = data;
    });
    this.rest.getTag().subscribe((data:any) => {
      this.tag = data;
    })
  }

  ngOnInit() {

  }
  getTag(): Tag {
    return this.tag;
  }

  getTags(): Tag[] {
    return this.tags;
  }

}