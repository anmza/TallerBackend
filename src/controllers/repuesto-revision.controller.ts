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
  Repuesto,
  Revision,
} from '../models';
import {RepuestoRepository} from '../repositories';

export class RepuestoRevisionController {
  constructor(
    @repository(RepuestoRepository) protected repuestoRepository: RepuestoRepository,
  ) { }

  @get('/repuestos/{id}/revisions', {
    responses: {
      '200': {
        description: 'Array of Repuesto has many Revision',
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
    return this.repuestoRepository.revisions(id).find(filter);
  }

  @post('/repuestos/{id}/revisions', {
    responses: {
      '200': {
        description: 'Repuesto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revision)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Repuesto.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revision, {
            title: 'NewRevisionInRepuesto',
            exclude: ['Id'],
            optional: ['repuestoId']
          }),
        },
      },
    }) revision: Omit<Revision, 'Id'>,
  ): Promise<Revision> {
    return this.repuestoRepository.revisions(id).create(revision);
  }

  @patch('/repuestos/{id}/revisions', {
    responses: {
      '200': {
        description: 'Repuesto.Revision PATCH success count',
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
    return this.repuestoRepository.revisions(id).patch(revision, where);
  }

  @del('/repuestos/{id}/revisions', {
    responses: {
      '200': {
        description: 'Repuesto.Revision DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revision)) where?: Where<Revision>,
  ): Promise<Count> {
    return this.repuestoRepository.revisions(id).delete(where);
  }
}
