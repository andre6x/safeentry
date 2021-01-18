import {ResponseStatus} from './response-status.model';
import {VehiculoModel} from "../data/vehiculo.model";
import {PreautorizacionModel} from "../data/preautorizacion.model";


export class ResponseFilterPreauthorization extends ResponseStatus {
  constructor(public items?: PreautorizacionModel[]) {
    super();
  }
}

