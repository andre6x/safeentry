import {ResponseStatus} from './response-status.model';
import {UserModel} from '../data/user.model';
import {RolModel} from '../data/rol.model';

export class ResponseLogin extends ResponseStatus {
  constructor(public usuarioModel?: UserModel,
              public rolModel?: RolModel
              /*public summary?: Summary*/) {
    super();
  }
}

