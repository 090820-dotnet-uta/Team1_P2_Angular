import { Media } from './media.model';
import { Tag } from "./tag.model";

export class MediaTag {
    constructor() {}
    mediaTagId?:number;
    tag:Tag;
    media:Media;
}