import { MediaType } from './mediatype.model';
import { MediaTag } from './mediatag.model';

export class Media {
  constructor() {}
  mediaId?: number;
  type?: MediaType;
  name?: string;
  mediaTag?: MediaTag[];
}
