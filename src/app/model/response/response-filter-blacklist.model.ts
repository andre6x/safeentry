import {ResponseStatus} from './response-status.model';
import {BlackListModel} from "../data/black-list.model";


export class ResponseFilterBlacklist extends ResponseStatus {
  constructor(public items?: BlackListModel[]) {
    super();
  }
}

