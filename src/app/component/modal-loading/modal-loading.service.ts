import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class ModalLoadingService {

    public display: boolean;
    public loading: boolean;

    constructor() {
    }

    showDialog() {
        this.display = true;
    }

    dismissDialog() {
        this.display = false;
    }

    showLoadingLayout() {
        this.loading = true;
    }

    dismissLoadingLayout() {
        this.loading = false;
    }

}
