import dbQuery from '../configs/database.js'
import argon2 from 'argon2'
import generateToken from '../scripts/generateToken.js'
import { Router } from 'express'
import Authentication from '../middleware/auth.js'

const router = Router()

router.use(Authentication.verifyJWT())

router.get('/', Authentication.requireRole('user'), (req, res) => {
  res.json('uwu')
})

export default router
