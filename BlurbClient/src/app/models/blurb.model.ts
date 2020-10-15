import { User } from './user.model';
import { Privacy } from './privacy.model';
import { Moment } from 'moment';
import { Media } from './media.model';

export class Blurb {
  constructor() {}
  blurbId?: number;
  message?: string;
  user?: User;
  score?: number;
  privacy?: Privacy;
  name?: string;
  media?: Media;
  timestamp?: Moment;
}
