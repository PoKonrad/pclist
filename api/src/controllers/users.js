import dbQuery from '../configs/database.js';
import { Router } from 'express';
import Authentication from '../middleware/auth.js';

const router = Router();

router.use(Authentication.verifyJWT());

router.post(':user/addRole', Authentication.requireRole('superadmin'), async (req, res) => {
    const reqBody = req.body;
    const userName = req.params.user;

    try {
        const userID = await dbQuery('SELECT id FROM users WHERE username = ?', [userName]);
        await dbQuery('INSERT INTO user_roles (user_id, role) VALUES (?, ?)', [userID, reqBody.role]);
    } catch(error) {
        res.status(500).json({
            error: true,
            message: 'An error has occured',
          });
    }
});

router.post(':user/revokeRole', Authentication.requireRole('superadmin'), async (req, res) => {
    const reqBody = req.body;
    const userName = req.params.user;

    try {
        const userID = await dbQuery('SELECT id FROM users WHERE username = ?', [userName]);
        await dbQuery('DELETE FROM user_roles WHERE user_id = ? AND role = ?', [userID, reqBody.role]);
    } catch(error) {
        res.status(500).json({
            error: true,
            message: 'An error has occured',
          });
    }
});

router.get('/', Authentication.requireRole('superadmin'), async (req, res) => {

    try {
        const userList = await dbQuery('SELECT u.username FROM users');
        res.status(200).json({
            error: false,
            data: userList
        });
    } catch(error) {
        res.status(500).json({
            error: true,
            message: 'An error has occured',
          });
    }
});

export default router;