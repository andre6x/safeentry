import {EmpresaModel} from './empresa.model';
import {EtapaModel} from './etapa.model';

export class PuntoModel {
  constructor(public id: number = 0,
              public tipo: string = '',
              public nombre: string = '',
              public direccion: string = '',
              public nemonicoSgi: string = '',
              public idSgi: number = 0,
              public longitud: string = '',
              public latitud: string = '',
              public estado: string = '',
              public empresa: EmpresaModel = null,
              public listEtapa: EtapaModel[] = null,
              public dateCreate: Date = null,
              public userCreate: string = '',
              public dateUpdate: Date = null,
              public userUpdate: string = '') {
  }
}
