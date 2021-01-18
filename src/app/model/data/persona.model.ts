
import {UserModel} from "./user.model";

export class PersonaModel {
  constructor(public id: number = 0,
              public tipoIdentificacion: string = '',
              public identificacion: string = '',
              public tipo: string = '',
              public nombres: string = '',
              public apellidos: string = '',
              public urlFoto: string = '',
              public usuarioModel: UserModel = null) {
  }
}
