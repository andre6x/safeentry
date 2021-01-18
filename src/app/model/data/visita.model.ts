import {LocalidadModel} from './localidad.model';
import {PersonaModel} from './persona.model';
import {VehiculoModel} from './vehiculo.model';
import {LlamadaModel} from './llamada.model';

export class VisitaModel {
  constructor(public id: number = 0,
              public fecha: Date = null,
              public accesoConcedido: number = 0,
              public estado: string = '',
              public metodoNotificacion: string = '',
              public descripcionServicio: string = '',
              public localidad: LocalidadModel = null,
              public persona: PersonaModel = null,
              public vehiculo: VehiculoModel = null,
              public llamadas: LlamadaModel[] = null) {
  }
}
