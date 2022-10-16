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
  SolicitudRevision,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoSolicitudRevisionController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/solicitud-revision', {
    responses: {
      '200': {
        description: 'Vehiculo has one SolicitudRevision',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SolicitudRevision),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudRevision>,
  ): Promise<SolicitudRevision> {
    return this.vehiculoRepository.solicitudRevision(id).get(filter);
  }

  @post('/vehiculos/{id}/solicitud-revision', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudRevision)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudRevision, {
            title: 'NewSolicitudRevisionInVehiculo',
            exclude: ['Id'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) solicitudRevision: Omit<SolicitudRevision, 'Id'>,
  ): Promise<SolicitudRevision> {
    return this.vehiculoRepository.solicitudRevision(id).create(solicitudRevision);
  }

  @patch('/vehiculos/{id}/solicitud-revision', {
    responses: {
      '200': {
        description: 'Vehiculo.SolicitudRevision PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudRevision, {partial: true}),
        },
      },
    })
    solicitudRevision: Partial<SolicitudRevision>,
    @param.query.object('where', getWhereSchemaFor(SolicitudRevision)) where?: Where<SolicitudRevision>,
  ): Promise<Count> {
    return this.vehiculoRepository.solicitudRevision(id).patch(solicitudRevision, where);
  }

  @del('/vehiculos/{id}/solicitud-revision', {
    responses: {
      '200': {
        description: 'Vehiculo.SolicitudRevision DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudRevision)) where?: Where<SolicitudRevision>,
  ): Promise<Count> {
    return this.vehiculoRepository.solicitudRevision(id).delete(where);
  }
}
