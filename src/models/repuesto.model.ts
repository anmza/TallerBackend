import {Entity, model, property, hasMany} from '@loopback/repository';
import {Revision} from './revision.model';

@model()
export class Repuesto extends Entity {
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
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Marca: string;

  @property({
    type: 'string',
    required: true,
  })
  Caracteristicas: string;

  @property({
    type: 'number',
    required: true,
  })
  Valor: number;

  @hasMany(() => Revision)
  revisions: Revision[];

  constructor(data?: Partial<Repuesto>) {
    super(data);
  }
}

export interface RepuestoRelations {
  // describe navigational properties here
}

export type RepuestoWithRelations = Repuesto & RepuestoRelations;
