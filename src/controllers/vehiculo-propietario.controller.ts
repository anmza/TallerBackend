import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  Propietario,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoPropietarioController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof Vehiculo.prototype.Id,
  ): Promise<Propietario> {
    return this.vehiculoRepository.propietario(id);
  }
}
