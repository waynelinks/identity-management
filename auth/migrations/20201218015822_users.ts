import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('first_name', 255).notNullable()
    table.string('last_name', 255).notNullable()
    table.string('email').unique().notNullable()
    table.string('password', 100).notNullable()
    table.boolean('is_admin').notNullable().defaultTo(false)
    table.boolean('verified').notNullable().defaultTo(false)
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
