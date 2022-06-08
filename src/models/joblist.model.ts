import {Entity, model, property} from '@loopback/repository';

@model()
export class Joblist extends Entity {
  @property({
    type: 'number',
    required: false,
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'boolean',
    required: true,
  })
  show: boolean;


  constructor(data?: Partial<Joblist>) {
    super(data);
  }
}

export interface JoblistRelations {
  // describe navigational properties here
}

export type JoblistWithRelations = Joblist & JoblistRelations;
