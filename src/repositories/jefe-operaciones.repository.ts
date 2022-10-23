import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoPropietarioDataSource} from '../datasources';
import {JefeOperaciones, JefeOperacionesRelations} from '../models';

export class JefeOperacionesRepository extends DefaultCrudRepository<
  JefeOperaciones,
  typeof JefeOperaciones.prototype.Id,
  JefeOperacionesRelations
> {
  constructor(
    @inject('datasources.MongoPropietario') dataSource: MongoPropietarioDataSource,
  ) {
    super(JefeOperaciones, dataSource);
  }
}
