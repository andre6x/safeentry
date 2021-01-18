export class PreautorizacionModel {
  constructor(public id: number = 0,
              public identificacionVisitante: string = '',
              public placaVehiculo: string = '',
              public tipo: string = '',
              public descripcion: string = '',
              public fechaInicio: Date = null,
              public fechaFin: Date = null,
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
