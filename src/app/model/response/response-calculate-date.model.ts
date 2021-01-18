import {ResponseStatus} from './response-status.model';

export class ResponseCalculateDateModel extends ResponseStatus {
  constructor(public valor: string = '',
              public fechaFin: string = ''
              ) {
    super();
  }
}

