import { Router } from 'express'

import { registerUser } from '../../controllers'
import { validate } from '../../middleware'

const router = Router()

router.route('/register').post(validate('register'), registerUser)

export { router as routes }
