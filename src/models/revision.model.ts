import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {SolicitudRevision} from './solicitud-revision.model';

@model()
export class Revision extends Entity {
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
  Observaciones: string;

  @property({
    type: 'string',
    required: true,
  })
  TipoRevision: string;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @property({
    type: 'string',
    required: true,
  })
  FechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  FechaAgendamiento: string;

  @property({
    type: 'string',
    required: true,
  })
  FechaEntrega: string;

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @belongsTo(() => SolicitudRevision)
  solicitudRevisionId: string;

  @property({
    type: 'string',
  })
  mecanicoId?: string;

  @property({
    type: 'string',
  })
  repuestoId?: string;

  constructor(data?: Partial<Revision>) {
    super(data);
  }
}

export interface RevisionRelations {
  // describe navigational properties here
}

export type RevisionWithRelations = Revision & RevisionRelations;
