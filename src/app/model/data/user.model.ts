import {RolModel} from './rol.model';
import {PersonaModel} from "./persona.model";

export class UserModel {
    constructor(public id: number = 0,
                public username: string = '',
                public email: string = '',
                public estado: string = '',
                public identificacion: string = '',
                public nombres: string = '',
                public apellidos: string = '',
                public urlFoto: string = '',
                public rol: RolModel = null,
                public persona: PersonaModel = null,
                public rolId: number = 0) {
    }
}
