
import {PersonaModel} from "./persona.model";

export class ResidenteModel {
  constructor(public id: number = 0,
              public tipo: string = '',
              public fechaInicio: Date = null,
              public fechaFin: Date = null,
              public estado: string = '',
              public persona: PersonaModel = null,
              public dateCreate: Date = null,
              public userCreate: string = '',
              public dateUpdate: Date = null,
              public userUpdate: string = '',
              public puntoId: number = 0,
              public localidadId: number = 0) {
  }
}
