import {ResponseStatus} from './response-status.model';
import {UserModel} from "../data/user.model";


export class ResponseFilterUser extends ResponseStatus {
  constructor(public items?: UserModel[]) {
    super();
  }
}

