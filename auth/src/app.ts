import 'express-async-errors'
import express from 'express'

import { commonMiddleware, errorDeligator } from './middleware'

const app = express()

commonMiddleware(app, express)

app.use(errorDeligator)

export { app }
