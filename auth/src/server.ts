import dotenv from 'dotenv'
import { createServer } from 'http'

import './db'
import { app } from './app'
import { CustomError } from './errors'
import { logger } from './utils'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

console.log(process.env.NODE_ENV)
if (!process.env.PRIVATE_KEY) throw new CustomError(500, 'PRIVATE_KEY is not set!')
const port = process.env.PORT || 3001
const server = createServer(app)

async function startServer() {
  try {
    await server.listen(port)
  } catch (err) {
    throw new CustomError(500, err.message)
  }
}

startServer()
  .then(() => logger.info(`Server running on port: ${port} env: ${process.env.NODE_ENV}`))
  .catch((err) => logger.error(err))
