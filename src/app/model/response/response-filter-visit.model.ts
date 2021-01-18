import {ResponseStatus} from './response-status.model';
import {VisitaModel} from '../data/visita.model';

export class ResponseFilterVisit extends ResponseStatus {
  constructor(public items?: VisitaModel[]) {
    super();
  }
}

