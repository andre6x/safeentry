import {ResponseStatus} from './response-status.model';
import {LocalidadModel} from "../data/localidad.model";


export class ResponseFilterLocation extends ResponseStatus {
  constructor(public items?: LocalidadModel[]) {
    super();
  }
}

