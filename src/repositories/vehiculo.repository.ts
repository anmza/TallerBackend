import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoPropietarioDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Propietario, SolicitudRevision, Revision} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {SolicitudRevisionRepository} from './solicitud-revision.repository';
import {RevisionRepository} from './revision.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.Id,
  VehiculoRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof Vehiculo.prototype.Id>;

  public readonly solicitudRevision: HasOneRepositoryFactory<SolicitudRevision, typeof Vehiculo.prototype.Id>;

  public readonly revision: HasOneRepositoryFactory<Revision, typeof Vehiculo.prototype.Id>;

  constructor(
    @inject('datasources.MongoPropietario') dataSource: MongoPropietarioDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('SolicitudRevisionRepository') protected solicitudRevisionRepositoryGetter: Getter<SolicitudRevisionRepository>, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.revision = this.createHasOneRepositoryFactoryFor('revision', revisionRepositoryGetter);
    this.registerInclusionResolver('revision', this.revision.inclusionResolver);
    this.solicitudRevision = this.createHasOneRepositoryFactoryFor('solicitudRevision', solicitudRevisionRepositoryGetter);
    this.registerInclusionResolver('solicitudRevision', this.solicitudRevision.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
