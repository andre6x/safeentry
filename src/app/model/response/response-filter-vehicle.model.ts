import {ResponseStatus} from './response-status.model';
import {VehiculoModel} from "../data/vehiculo.model";


export class ResponseFilterVehicle extends ResponseStatus {
  constructor(public items?: VehiculoModel[]) {
    super();
  }
}

