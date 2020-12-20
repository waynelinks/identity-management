import 'express-async-errors'
import express from 'express'

import { commonMiddleware, errorDeligator, requestTraceId } from './middleware'
import { notFound } from './middleware/notFound'

const app = express()

commonMiddleware(app, express)
app.use(requestTraceId)

notFound(app)
app.use(errorDeligator)

export { app }
