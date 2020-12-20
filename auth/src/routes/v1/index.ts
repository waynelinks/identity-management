import { Router } from 'express'

import { registerUser, signinUser } from '../../controllers'
import { validate } from '../../middleware'

const router = Router()

router.route('/register').post(validate('register'), registerUser)
router.route('/signin').post(validate('signin'), signinUser)

export { router as routes }
