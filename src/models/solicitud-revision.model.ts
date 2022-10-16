import {Entity, model, property} from '@loopback/repository';

@model()
export class SolicitudRevision extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  TipoRevision: string;

  @property({
    type: 'string',
  })
  propietarioId?: string;

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  constructor(data?: Partial<SolicitudRevision>) {
    super(data);
  }
}

export interface SolicitudRevisionRelations {
  // describe navigational properties here
}

export type SolicitudRevisionWithRelations = SolicitudRevision & SolicitudRevisionRelations;
