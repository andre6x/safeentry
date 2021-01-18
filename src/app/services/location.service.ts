import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// observables
import {Observable, of, Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import {ModalLoadingService} from '../component/modal-loading/modal-loading.service';
import {MSJ_ERROR_METODO, URL_SERVICIOS} from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(public http: HttpClient, public modalLoadingService: ModalLoadingService) { }


}
