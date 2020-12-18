import knex from 'knex'

import knexfile from '../../knexfile'
import { IKnexConfig } from '../interfaces'

const config: IKnexConfig = knexfile

export const db = knex(
  config[process.env.NODE_ENV || 'development'] as knex.Config,
)
