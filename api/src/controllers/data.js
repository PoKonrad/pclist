import dbQuery from '../configs/database.js';
import { Router } from 'express';
import Authentication from '../middleware/auth.js';

const router = Router();

router.use(Authentication.verifyJWT());

router.get('/', Authentication.requireRole('user'), async (req, res) => {
  await dbQuery();
});

export default router;
