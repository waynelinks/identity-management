import { Router } from 'express'

import { currentActiveUser, registerUser, signinUser, signoutUser } from '../../controllers'
import { currentUser, validate } from '../../middleware'

const router = Router()

router.route('/register').post(validate('register'), registerUser)
router.route('/signin').post(validate('signin'), signinUser)
router.route('/signout').post(validate('signout'), signoutUser)
router.route('/currentuser').get(currentUser, currentActiveUser)

export { router as routes }
