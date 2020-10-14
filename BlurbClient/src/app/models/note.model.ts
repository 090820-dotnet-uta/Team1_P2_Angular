import { Blurb } from './blurb.model';
import { Media } from "./media.model";

export class Note {
    constructor() {}
    noteId?: number;
    blurb?: Blurb;
    meida?: Media;
    noteBody?: string;
}