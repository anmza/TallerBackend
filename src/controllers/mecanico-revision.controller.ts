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
  Mecanico,
  Revision,
} from '../models';
import {MecanicoRepository} from '../repositories';

export class MecanicoRevisionController {
  constructor(
    @repository(MecanicoRepository) protected mecanicoRepository: MecanicoRepository,
  ) { }

  @get('/mecanicos/{id}/revisions', {
    responses: {
      '200': {
        description: 'Array of Mecanico has many Revision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Revision)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Revision>,
  ): Promise<Revision[]> {
    return this.mecanicoRepository.revisions(id).find(filter);
  }

  @post('/mecanicos/{id}/revisions', {
    responses: {
      '200': {
        description: 'Mecanico model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revision)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mecanico.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revision, {
            title: 'NewRevisionInMecanico',
            exclude: ['Id'],
            optional: ['mecanicoId']
          }),
        },
      },
    }) revision: Omit<Revision, 'Id'>,
  ): Promise<Revision> {
    return this.mecanicoRepository.revisions(id).create(revision);
  }

  @patch('/mecanicos/{id}/revisions', {
    responses: {
      '200': {
        description: 'Mecanico.Revision PATCH success count',
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
    return this.mecanicoRepository.revisions(id).patch(revision, where);
  }

  @del('/mecanicos/{id}/revisions', {
    responses: {
      '200': {
        description: 'Mecanico.Revision DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revision)) where?: Where<Revision>,
  ): Promise<Count> {
    return this.mecanicoRepository.revisions(id).delete(where);
  }
}
