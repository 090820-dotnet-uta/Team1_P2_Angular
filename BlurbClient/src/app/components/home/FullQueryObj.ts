import { SortSettings } from './SortSettings';

export class FullQueryObj {
    settings: SortSettings;
    sinceId: number;
    span: number;

    constructor(settings: SortSettings, sinceId: number, span: number) {
        this.settings = settings;
        this.sinceId = sinceId;
        this.span = span;
    }


    updateSettings(settings: SortSettings) {
        this.settings = settings;
    }
}