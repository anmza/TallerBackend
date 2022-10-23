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
  Revision,
  Vehiculo,
} from '../models';
import {RevisionRepository} from '../repositories';

export class RevisionVehiculoController {
  constructor(
    @repository(RevisionRepository) protected revisionRepository: RevisionRepository,
  ) { }

  @get('/revisions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Revision has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.revisionRepository.vehiculos(id).find(filter);
  }

  @post('/revisions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Revision model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Revision.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInRevision',
            exclude: ['Id'],
            optional: ['revisionId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'Id'>,
  ): Promise<Vehiculo> {
    return this.revisionRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/revisions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Revision.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.revisionRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/revisions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Revision.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.revisionRepository.vehiculos(id).delete(where);
  }
}
