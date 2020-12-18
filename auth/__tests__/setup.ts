import { db } from '../src/db'

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterEach(async () => {
  await db('users').del()
})

afterAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
