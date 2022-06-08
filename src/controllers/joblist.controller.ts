import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Joblist} from '../models';
import {JoblistRepository} from '../repositories';

export class JoblistController {
  constructor(
    @repository(JoblistRepository)
    public joblistRepository : JoblistRepository,
  ) {}

  @post('/joblists')
  @response(200, {
    description: 'Joblist model instance',
    content: {'application/json': {schema: getModelSchemaRef(Joblist)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Joblist, {
            title: 'NewJoblist',
            exclude: ['id'],
          }),
        },
      },
    })
    joblist: Omit<Joblist, 'id'>,
  ): Promise<Joblist> {
    return this.joblistRepository.create(joblist);
  }

  @get('/joblists/count')
  @response(200, {
    description: 'Joblist model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Joblist) where?: Where<Joblist>,
  ): Promise<Count> {
    return this.joblistRepository.count(where);
  }

  @get('/joblists')
  @response(200, {
    description: 'Array of Joblist model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Joblist, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Joblist) filter?: Filter<Joblist>,
  ): Promise<Joblist[]> {
    return this.joblistRepository.find(filter);
  }

  @patch('/joblists')
  @response(200, {
    description: 'Joblist PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Joblist, {partial: true}),
        },
      },
    })
    joblist: Joblist,
    @param.where(Joblist) where?: Where<Joblist>,
  ): Promise<Count> {
    return this.joblistRepository.updateAll(joblist, where);
  }

  @get('/joblists/{id}')
  @response(200, {
    description: 'Joblist model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Joblist, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Joblist, {exclude: 'where'}) filter?: FilterExcludingWhere<Joblist>
  ): Promise<Joblist> {
    return this.joblistRepository.findById(id, filter);
  }

  @patch('/joblists/{id}')
  @response(204, {
    description: 'Joblist PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Joblist, {partial: true}),
        },
      },
    })
    joblist: Joblist,
  ): Promise<void> {
    await this.joblistRepository.updateById(id, joblist);
  }

  @put('/joblists/{id}')
  @response(204, {
    description: 'Joblist PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() joblist: Joblist,
  ): Promise<void> {
    await this.joblistRepository.replaceById(id, joblist);
  }

  @del('/joblists/{id}')
  @response(204, {
    description: 'Joblist DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.joblistRepository.deleteById(id);
  }
}
