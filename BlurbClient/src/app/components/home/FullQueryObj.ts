import { Settings } from './Settings';

export class FullQueryObj {
  settings: Settings;
  sinceId: number;
  span: number;

  constructor(settings: Settings, sinceId: number, span: number) {
    this.settings = settings;
    this.sinceId = sinceId;
    this.span = span;
  }

  updateSettings(settings: Settings) {
    this.settings = settings;
  }
}
