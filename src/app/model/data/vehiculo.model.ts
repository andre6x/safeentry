
export class VehiculoModel {
  constructor(public id: number = 0,
              public tipo: string = '',
              public placa: string = '',
              public estado: string = '',
              public dateCreate: Date = null,
              public userCreate: string = '',
              public dateUpdate: Date = null,
              public userUpdate: string = '',
              public puntoId: number = 0,
              public localidadId: number = 0) {
  }
}
