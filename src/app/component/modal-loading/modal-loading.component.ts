import {Component, OnInit} from '@angular/core';
import {ModalLoadingService} from './modal-loading.service';

@Component({
    selector: 'app-modal-loading',
    templateUrl: './modal-loading.component.html',
    styleUrls: ['./modal-loading.component.css']
})
export class ModalLoadingComponent implements OnInit {

    constructor(public modalLoadingService: ModalLoadingService) {
    }

    ngOnInit() {
    }


}
