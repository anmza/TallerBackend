import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Mecanico} from '../models';
import {MecanicoRepository} from '../repositories';

export class MecanicoController {
  constructor(
    @repository(MecanicoRepository)
    public mecanicoRepository : MecanicoRepository,
  ) {}

  @post('/mecanicos')
  @response(200, {
    description: 'Mecanico model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mecanico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanico, {
            title: 'NewMecanico',
            exclude: ['Id'],
          }),
        },
      },
    })
    mecanico: Omit<Mecanico, 'Id'>,
  ): Promise<Mecanico> {
    return this.mecanicoRepository.create(mecanico);
  }

  @get('/mecanicos/count')
  @response(200, {
    description: 'Mecanico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mecanico) where?: Where<Mecanico>,
  ): Promise<Count> {
    return this.mecanicoRepository.count(where);
  }

  @get('/mecanicos')
  @response(200, {
    description: 'Array of Mecanico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mecanico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mecanico) filter?: Filter<Mecanico>,
  ): Promise<Mecanico[]> {
    return this.mecanicoRepository.find(filter);
  }

  @patch('/mecanicos')
  @response(200, {
    description: 'Mecanico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanico, {partial: true}),
        },
      },
    })
    mecanico: Mecanico,
    @param.where(Mecanico) where?: Where<Mecanico>,
  ): Promise<Count> {
    return this.mecanicoRepository.updateAll(mecanico, where);
  }

  @get('/mecanicos/{id}')
  @response(200, {
    description: 'Mecanico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mecanico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mecanico, {exclude: 'where'}) filter?: FilterExcludingWhere<Mecanico>
  ): Promise<Mecanico> {
    return this.mecanicoRepository.findById(id, filter);
  }

  @patch('/mecanicos/{id}')
  @response(204, {
    description: 'Mecanico PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mecanico, {partial: true}),
        },
      },
    })
    mecanico: Mecanico,
  ): Promise<void> {
    await this.mecanicoRepository.updateById(id, mecanico);
  }

  @put('/mecanicos/{id}')
  @response(204, {
    description: 'Mecanico PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mecanico: Mecanico,
  ): Promise<void> {
    await this.mecanicoRepository.replaceById(id, mecanico);
  }

  @del('/mecanicos/{id}')
  @response(204, {
    description: 'Mecanico DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mecanicoRepository.deleteById(id);
  }
}
