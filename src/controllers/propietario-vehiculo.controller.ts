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
  Vehiculo,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioVehiculoController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Propietario has many Vehiculo',
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
    return this.propietarioRepository.vehiculos(id).find(filter);
  }

  @post('/propietarios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInPropietario',
            exclude: ['Id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'Id'>,
  ): Promise<Vehiculo> {
    return this.propietarioRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/propietarios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Propietario.Vehiculo PATCH success count',
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
    return this.propietarioRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/propietarios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Propietario.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.propietarioRepository.vehiculos(id).delete(where);
  }
}
