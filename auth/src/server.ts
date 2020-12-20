import { createServer } from 'http'

import './db'
import { app } from './app'
import { AppError } from './errors'
import { logger } from './utils'
import { CommonErrors, HttpStatusCode } from './enums'

if (!process.env.TOKEN_KEY) {
  throw new AppError(
    CommonErrors.SERVER_ERROR,
    HttpStatusCode.SERVER_ERROR,
    ' TOKEN_SECRET is not set!',
    true,
  )
}

const port = process.env.PORT || 3001
const server = createServer(app)

async function startServer() {
  try {
    await server.listen(port)
  } catch (err) {
    throw new AppError(
      CommonErrors.SERVER_ERROR,
      HttpStatusCode.SERVER_ERROR,
      err.message,
      true,
    )
  }
}

startServer()
  .then(() => logger.info(`Server running on port: ${port} env: ${process.env.NODE_ENV}`))
  .catch((err) => logger.error(err))