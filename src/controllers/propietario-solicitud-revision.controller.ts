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
  Propietario,
  SolicitudRevision,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioSolicitudRevisionController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/solicitud-revisions', {
    responses: {
      '200': {
        description: 'Array of Propietario has many SolicitudRevision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudRevision)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudRevision>,
  ): Promise<SolicitudRevision[]> {
    return this.propietarioRepository.solicitudRevisions(id).find(filter);
  }

  @post('/propietarios/{id}/solicitud-revisions', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudRevision)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudRevision, {
            title: 'NewSolicitudRevisionInPropietario',
            exclude: ['Id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) solicitudRevision: Omit<SolicitudRevision, 'Id'>,
  ): Promise<SolicitudRevision> {
    return this.propietarioRepository.solicitudRevisions(id).create(solicitudRevision);
  }

  @patch('/propietarios/{id}/solicitud-revisions', {
    responses: {
      '200': {
        description: 'Propietario.SolicitudRevision PATCH success count',
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
    return this.propietarioRepository.solicitudRevisions(id).patch(solicitudRevision, where);
  }

  @del('/propietarios/{id}/solicitud-revisions', {
    responses: {
      '200': {
        description: 'Propietario.SolicitudRevision DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudRevision)) where?: Where<SolicitudRevision>,
  ): Promise<Count> {
    return this.propietarioRepository.solicitudRevisions(id).delete(where);
  }
}
