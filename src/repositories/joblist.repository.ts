import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FrsmongodbDataSource} from '../datasources';
import {Joblist, JoblistRelations} from '../models';

export class JoblistRepository extends DefaultCrudRepository<
  Joblist,
  typeof Joblist.prototype.id,
  JoblistRelations
> {
  constructor(
    @inject('datasources.frsmongodb') dataSource: FrsmongodbDataSource,
  ) {
    super(Joblist, dataSource);
  }
}
