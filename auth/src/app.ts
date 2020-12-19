import 'express-async-errors'
import express from 'express'

import { errorDeligator } from './middleware'

const app = express()

app.use(errorDeligator)

export { app }
