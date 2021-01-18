
export class TelefonoContactoModel {
  constructor(public id: number = 0,
              public valor: string = '',
              public prioridad: number = 0,
              public descripcion: string = '',
              public urlFoto: string = '',
              public estado: string = '',
              public dateCreate: Date = null,
              public userCreate: string = '',
              public dateUpdate: Date = null,
              public userUpdate: string = '',
              public puntoId: number = 0,
              public localidadId: number = 0) {
  }
}
