import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoPropietarioDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Propietario, SolicitudRevision} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {SolicitudRevisionRepository} from './solicitud-revision.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.Id,
  VehiculoRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof Vehiculo.prototype.Id>;

  public readonly solicitudRevision: HasOneRepositoryFactory<SolicitudRevision, typeof Vehiculo.prototype.Id>;

  constructor(
    @inject('datasources.MongoPropietario') dataSource: MongoPropietarioDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('SolicitudRevisionRepository') protected solicitudRevisionRepositoryGetter: Getter<SolicitudRevisionRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.solicitudRevision = this.createHasOneRepositoryFactoryFor('solicitudRevision', solicitudRevisionRepositoryGetter);
    this.registerInclusionResolver('solicitudRevision', this.solicitudRevision.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
