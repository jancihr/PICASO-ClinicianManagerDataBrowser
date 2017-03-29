import {Injectable, EventEmitter} from '@angular/core';
import {SharedModel} from "./SharedModel";

@Injectable()
export class CdSharedModelService {

    public dataChanged$: EventEmitter<any>;
    private data: SharedModel;

    constructor() {
        this.data = new SharedModel();
        this.dataChanged$ = new EventEmitter();
    }

    public get(): SharedModel {
        return this.data;
    }

    public update(item: SharedModel): void {
        this.data = item;
        this.dataChanged$.emit(item);
    }
}
