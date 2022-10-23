import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vehiculo,
  Revision,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoRevisionController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/revision', {
    responses: {
      '200': {
        description: 'Vehiculo has one Revision',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Revision),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Revision>,
  ): Promise<Revision> {
    return this.vehiculoRepository.revision(id).get(filter);
  }

  @post('/vehiculos/{id}/revision', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revision)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revision, {
            title: 'NewRevisionInVehiculo',
            exclude: ['Id'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) revision: Omit<Revision, 'Id'>,
  ): Promise<Revision> {
    return this.vehiculoRepository.revision(id).create(revision);
  }

  @patch('/vehiculos/{id}/revision', {
    responses: {
      '200': {
        description: 'Vehiculo.Revision PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revision, {partial: true}),
        },
      },
    })
    revision: Partial<Revision>,
    @param.query.object('where', getWhereSchemaFor(Revision)) where?: Where<Revision>,
  ): Promise<Count> {
    return this.vehiculoRepository.revision(id).patch(revision, where);
  }

  @del('/vehiculos/{id}/revision', {
    responses: {
      '200': {
        description: 'Vehiculo.Revision DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revision)) where?: Where<Revision>,
  ): Promise<Count> {
    return this.vehiculoRepository.revision(id).delete(where);
  }
}
