import {PersonaModel} from "./persona.model";
import {VehiculoModel} from "./vehiculo.model";

export class LocalidadModel {
    constructor(public id: number = 0,
                public tipo: string = '',
                public metodoNotificacion: number = 0,
                public manzana: string = '',
                public villa: string = '',
                public descripcion: string = '', // edificio
                public piso: string = '',
                public departamento: string = '',
                public estado: string = '',
                public latitud: string = '0',
                public longitud: string = '0',
                public puntoId: number = 0,
                public etapaId: number = 0,
                public residentes: PersonaModel[] = null,
                public vehiculos: VehiculoModel[] = null,
                public dateCreate: Date = null,
                public userCreate: string = '',
                public dateUpdate: Date = null,
                public userUpdate: string = '',
                public localidadPadre: LocalidadModel = null,
                public listLocalidadModel: LocalidadModel[] = null) {
    }
}
