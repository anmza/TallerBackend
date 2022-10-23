import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoPropietarioDataSource} from '../datasources';
import {Repuesto, RepuestoRelations, Revision} from '../models';
import {RevisionRepository} from './revision.repository';

export class RepuestoRepository extends DefaultCrudRepository<
  Repuesto,
  typeof Repuesto.prototype.Id,
  RepuestoRelations
> {

  public readonly revisions: HasManyRepositoryFactory<Revision, typeof Repuesto.prototype.Id>;

  constructor(
    @inject('datasources.MongoPropietario') dataSource: MongoPropietarioDataSource, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>,
  ) {
    super(Repuesto, dataSource);
    this.revisions = this.createHasManyRepositoryFactoryFor('revisions', revisionRepositoryGetter,);
    this.registerInclusionResolver('revisions', this.revisions.inclusionResolver);
  }
}
