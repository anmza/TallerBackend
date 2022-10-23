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
import {JefeOperaciones} from '../models';
import {JefeOperacionesRepository} from '../repositories';

export class JefeOperacionesController {
  constructor(
    @repository(JefeOperacionesRepository)
    public jefeOperacionesRepository : JefeOperacionesRepository,
  ) {}

  @post('/jefe-operaciones')
  @response(200, {
    description: 'JefeOperaciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(JefeOperaciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JefeOperaciones, {
            title: 'NewJefeOperaciones',
            exclude: ['Id'],
          }),
        },
      },
    })
    jefeOperaciones: Omit<JefeOperaciones, 'Id'>,
  ): Promise<JefeOperaciones> {
    return this.jefeOperacionesRepository.create(jefeOperaciones);
  }

  @get('/jefe-operaciones/count')
  @response(200, {
    description: 'JefeOperaciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(JefeOperaciones) where?: Where<JefeOperaciones>,
  ): Promise<Count> {
    return this.jefeOperacionesRepository.count(where);
  }

  @get('/jefe-operaciones')
  @response(200, {
    description: 'Array of JefeOperaciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(JefeOperaciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(JefeOperaciones) filter?: Filter<JefeOperaciones>,
  ): Promise<JefeOperaciones[]> {
    return this.jefeOperacionesRepository.find(filter);
  }

  @patch('/jefe-operaciones')
  @response(200, {
    description: 'JefeOperaciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JefeOperaciones, {partial: true}),
        },
      },
    })
    jefeOperaciones: JefeOperaciones,
    @param.where(JefeOperaciones) where?: Where<JefeOperaciones>,
  ): Promise<Count> {
    return this.jefeOperacionesRepository.updateAll(jefeOperaciones, where);
  }

  @get('/jefe-operaciones/{id}')
  @response(200, {
    description: 'JefeOperaciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(JefeOperaciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(JefeOperaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<JefeOperaciones>
  ): Promise<JefeOperaciones> {
    return this.jefeOperacionesRepository.findById(id, filter);
  }

  @patch('/jefe-operaciones/{id}')
  @response(204, {
    description: 'JefeOperaciones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JefeOperaciones, {partial: true}),
        },
      },
    })
    jefeOperaciones: JefeOperaciones,
  ): Promise<void> {
    await this.jefeOperacionesRepository.updateById(id, jefeOperaciones);
  }

  @put('/jefe-operaciones/{id}')
  @response(204, {
    description: 'JefeOperaciones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() jefeOperaciones: JefeOperaciones,
  ): Promise<void> {
    await this.jefeOperacionesRepository.replaceById(id, jefeOperaciones);
  }

  @del('/jefe-operaciones/{id}')
  @response(204, {
    description: 'JefeOperaciones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.jefeOperacionesRepository.deleteById(id);
  }
}
