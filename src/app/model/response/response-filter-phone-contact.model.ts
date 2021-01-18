import {ResponseStatus} from './response-status.model';
import {TelefonoContactoModel} from "../data/telefono-contacto.model";

export class ResponseFilterPhoneContact extends ResponseStatus {
  constructor(public items?: TelefonoContactoModel[]) {
    super();
  }
}

