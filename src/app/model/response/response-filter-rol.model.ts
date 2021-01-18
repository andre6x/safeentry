import {ResponseStatus} from './response-status.model';
import {RolModel} from "../data/rol.model";


export class ResponseFilterRol extends ResponseStatus {
  constructor(public items?: RolModel[]) {
    super();
  }
}

