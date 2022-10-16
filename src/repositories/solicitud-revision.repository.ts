import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoPropietarioDataSource} from '../datasources';
import {SolicitudRevision, SolicitudRevisionRelations} from '../models';

export class SolicitudRevisionRepository extends DefaultCrudRepository<
  SolicitudRevision,
  typeof SolicitudRevision.prototype.Id,
  SolicitudRevisionRelations
> {
  constructor(
    @inject('datasources.MongoPropietario') dataSource: MongoPropietarioDataSource,
  ) {
    super(SolicitudRevision, dataSource);
  }
}
