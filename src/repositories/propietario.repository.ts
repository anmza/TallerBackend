import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoPropietarioDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Vehiculo, SolicitudRevision} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {SolicitudRevisionRepository} from './solicitud-revision.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.Id,
  PropietarioRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Propietario.prototype.Id>;

  public readonly solicitudRevisions: HasManyRepositoryFactory<SolicitudRevision, typeof Propietario.prototype.Id>;

  constructor(
    @inject('datasources.MongoPropietario') dataSource: MongoPropietarioDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('SolicitudRevisionRepository') protected solicitudRevisionRepositoryGetter: Getter<SolicitudRevisionRepository>,
  ) {
    super(Propietario, dataSource);
    this.solicitudRevisions = this.createHasManyRepositoryFactoryFor('solicitudRevisions', solicitudRevisionRepositoryGetter,);
    this.registerInclusionResolver('solicitudRevisions', this.solicitudRevisions.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
