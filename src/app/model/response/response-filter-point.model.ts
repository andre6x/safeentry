import {ResponseStatus} from './response-status.model';
import {PuntoModel} from '../data/punto.model';


export class ResponseFilterPoint extends ResponseStatus {
  constructor(public items?: PuntoModel[]) {
    super();
  }
}

