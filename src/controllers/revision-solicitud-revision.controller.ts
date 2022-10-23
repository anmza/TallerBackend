import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Revision,
  SolicitudRevision,
} from '../models';
import {RevisionRepository} from '../repositories';

export class RevisionSolicitudRevisionController {
  constructor(
    @repository(RevisionRepository)
    public revisionRepository: RevisionRepository,
  ) { }

  @get('/revisions/{id}/solicitud-revision', {
    responses: {
      '200': {
        description: 'SolicitudRevision belonging to Revision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudRevision)},
          },
        },
      },
    },
  })
  async getSolicitudRevision(
    @param.path.string('id') id: typeof Revision.prototype.Id,
  ): Promise<SolicitudRevision> {
    return this.revisionRepository.solicitudRevision(id);
  }
}
