import { User } from './user.model';
import { Enum } from './privacy.model';
import { Moment } from 'moment';
import { Media } from "./media.model";

export class Blurb {
    constructor() {}
    blurbId?:number;
    message?:string;
    user?:User;
    score?:number;
    privacy?:Enum;
    name?:string;
    media?:Media;
    timeStamp?:Moment;
  }

