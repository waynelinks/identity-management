import dotenv from 'dotenv'
import { createServer } from 'http'

import './db'
import { app } from './app'
import { ServerError } from './errors'
import { logger } from './utils'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

if (!process.env.TOKEN_SECRET) throw new ServerError('TOKEN_SECRET is not set!')

const port = process.env.PORT || 3001
const server = createServer(app)

async function startServer() {
  try {
    await server.listen(port)
  } catch (err) {
    throw new ServerError(err.message)
  }
}

startServer()
  .then(() => logger.info(`Server running on port: ${port} env: ${process.env.NODE_ENV}`))
  .catch((err) => logger.error(err))
