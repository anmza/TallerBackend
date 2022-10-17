import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {SolicitudRevision} from '../models';
import {SolicitudRevisionRepository} from '../repositories';


@authenticate("userProp")
export class SolicitudController {
  constructor(
    @repository(SolicitudRevisionRepository)
    public solicitudRevisionRepository: SolicitudRevisionRepository,
  ) { }

  @post('/solicitud-revisions')
  @response(200, {
    description: 'SolicitudRevision model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudRevision)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudRevision, {
            title: 'NewSolicitudRevision',
            exclude: ['Id'],
          }),
        },
      },
    })
    solicitudRevision: Omit<SolicitudRevision, 'id'>,
  ): Promise<SolicitudRevision> {
    return this.solicitudRevisionRepository.create(solicitudRevision);
  }

  @authenticate.skip()
  @get('/solicitud-revisions/count')
  @response(200, {
    description: 'SolicitudRevision model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudRevision) where?: Where<SolicitudRevision>,
  ): Promise<Count> {
    return this.solicitudRevisionRepository.count(where);
  }

  @authenticate.skip()
  @get('/solicitud-revisions')
  @response(200, {
    description: 'Array of SolicitudRevision model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudRevision, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudRevision) filter?: Filter<SolicitudRevision>,
  ): Promise<SolicitudRevision[]> {
    return this.solicitudRevisionRepository.find(filter);
  }

  @patch('/solicitud-revisions')
  @response(200, {
    description: 'SolicitudRevision PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudRevision, {partial: true}),
        },
      },
    })
    solicitudRevision: SolicitudRevision,
    @param.where(SolicitudRevision) where?: Where<SolicitudRevision>,
  ): Promise<Count> {
    return this.solicitudRevisionRepository.updateAll(solicitudRevision, where);
  }

  @get('/solicitud-revisions/{id}')
  @response(200, {
    description: 'SolicitudRevision model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudRevision, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SolicitudRevision, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudRevision>
  ): Promise<SolicitudRevision> {
    return this.solicitudRevisionRepository.findById(id, filter);
  }

  @patch('/solicitud-revisions/{id}')
  @response(204, {
    description: 'SolicitudRevision PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudRevision, {partial: true}),
        },
      },
    })
    solicitudRevision: SolicitudRevision,
  ): Promise<void> {
    await this.solicitudRevisionRepository.updateById(id, solicitudRevision);
  }

  @put('/solicitud-revisions/{id}')
  @response(204, {
    description: 'SolicitudRevision PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitudRevision: SolicitudRevision,
  ): Promise<void> {
    await this.solicitudRevisionRepository.replaceById(id, solicitudRevision);
  }

  @del('/solicitud-revisions/{id}')
  @response(204, {
    description: 'SolicitudRevision DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solicitudRevisionRepository.deleteById(id);
  }
}
