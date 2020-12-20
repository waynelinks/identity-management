import { Router } from 'express'

import { currentActiveUser, registerUser, signinUser } from '../../controllers'
import { currentUser, validate } from '../../middleware'

const router = Router()

router.route('/register').post(validate('register'), registerUser)
router.route('/signin').post(validate('signin'), signinUser)

router.route('/currentuser').get(currentUser, currentActiveUser)

export { router as routes }
