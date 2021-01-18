import {ResponseStatus} from './response-status.model';
import {EmpresaModel} from "../data/empresa.model";


export class ResponseFilterClient extends ResponseStatus {
  constructor(public items?: EmpresaModel[]) {
    super();
  }
}

