import { Type } from "./type.model";
import { MediaTag } from "./mediatag.model";

export class Media {
    constructor() {}
    mediaId?: number;
    type?: Type;
    name?: string;
    mediaTag?: MediaTag[];
}