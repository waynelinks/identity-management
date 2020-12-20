import 'express-async-errors'
import express from 'express'

import { commonMiddleware, errorDeligator } from './middleware'
import { notFound } from './middleware/notFound'

const app = express()

commonMiddleware(app, express)

notFound(app)
app.use(errorDeligator)

export { app }
