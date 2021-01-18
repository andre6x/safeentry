import {ResponseStatus} from './response-status.model';
import {ResidenteModel} from "../data/residente.model";


export class ResponseFilterResident extends ResponseStatus {
  constructor(public items?: ResidenteModel[]) {
    super();
  }
}

