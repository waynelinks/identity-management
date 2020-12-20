import 'express-async-errors'
import express from 'express'

import { commonMiddleware, errorDeligator, requestTraceId } from './middleware'
import { notFound } from './middleware/notFound'
import { routes } from './routes/v1'

const app = express()

commonMiddleware(app, express)
app.use(requestTraceId)

app.use(`${process.env.BASE_API_V1}`, routes)

notFound(app)
app.use(errorDeligator)

export { app }
