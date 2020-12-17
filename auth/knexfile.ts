import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export default {
  test: {
    client: 'postgresql',
    connection: process.env.DB_URI,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      extension: 'ts',
    },
  },

  development: {
    client: 'postgresql',
    connection: process.env.DB_URI,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      extension: 'ts',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DB_URI,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      extension: 'ts',
    },
  },
}
