import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoPropietarioDataSource} from '../datasources';
import {Revision, RevisionRelations, Vehiculo, SolicitudRevision} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {SolicitudRevisionRepository} from './solicitud-revision.repository';

export class RevisionRepository extends DefaultCrudRepository<
  Revision,
  typeof Revision.prototype.Id,
  RevisionRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Revision.prototype.Id>;

  public readonly solicitudRevision: BelongsToAccessor<SolicitudRevision, typeof Revision.prototype.Id>;

  constructor(
    @inject('datasources.MongoPropietario') dataSource: MongoPropietarioDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('SolicitudRevisionRepository') protected solicitudRevisionRepositoryGetter: Getter<SolicitudRevisionRepository>,
  ) {
    super(Revision, dataSource);
    this.solicitudRevision = this.createBelongsToAccessorFor('solicitudRevision', solicitudRevisionRepositoryGetter,);
    this.registerInclusionResolver('solicitudRevision', this.solicitudRevision.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
