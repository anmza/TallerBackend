import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoPropietarioDataSource} from '../datasources';
import {Mecanico, MecanicoRelations, Revision} from '../models';
import {RevisionRepository} from './revision.repository';

export class MecanicoRepository extends DefaultCrudRepository<
  Mecanico,
  typeof Mecanico.prototype.Id,
  MecanicoRelations
> {

  public readonly revisions: HasManyRepositoryFactory<Revision, typeof Mecanico.prototype.Id>;

  constructor(
    @inject('datasources.MongoPropietario') dataSource: MongoPropietarioDataSource, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>,
  ) {
    super(Mecanico, dataSource);
    this.revisions = this.createHasManyRepositoryFactoryFor('revisions', revisionRepositoryGetter,);
    this.registerInclusionResolver('revisions', this.revisions.inclusionResolver);
  }
}
