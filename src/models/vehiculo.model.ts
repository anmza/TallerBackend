import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Propietario} from './propietario.model';
import {SolicitudRevision} from './solicitud-revision.model';
import {Revision} from './revision.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Placa: string;

  @property({
    type: 'string',
    required: true,
  })
  Marca: string;

  @property({
    type: 'string',
    required: true,
  })
  Modelo: string;

  @property({
    type: 'number',
    required: true,
  })
  Pasajeros: number;

  @property({
    type: 'string',
    required: true,
  })
  Motor: string;

  @property({
    type: 'string',
    required: true,
  })
  Pais: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  @hasOne(() => SolicitudRevision)
  solicitudRevision: SolicitudRevision;

  @hasOne(() => Revision)
  revision: Revision;

  @property({
    type: 'string',
  })
  revisionId?: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
