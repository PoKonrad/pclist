import dbQuery from '../configs/database.js';
import { Router } from 'express';
import Authentication from '../middleware/auth.js';

const router = Router();

router.use(Authentication.verifyJWT());

router.get(
  '/:from-:to',
  Authentication.requireRole('user'),
  async (req, res) => {
    const from = parseInt(req.params.from);
    const to = parseInt(req.params.to);
    const resp = await dbQuery('SELECT * FROM pcs LIMIT ?,?', [from, to]);

    res.status(200).json({
      error: false,
      data: resp,
    });
  }
);

router.post('/', Authentication.requireRole('admin'), async (req, res) => {
  const postData = req.body;
  try {
    await dbQuery('INSERT INTO pcs (name, cpu, gpu, ram) VALUES (?, ?, ?, ?)', [
      postData.name,
      postData.cpu,
      postData.gpu,
      postData.ram,
    ]);

    res.status(201).json({
      error: false,
      message: 'Succesfully inserted',
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'An error has occured',
    });
  }
});

router.patch('/', Authentication.requireRole('admin'), async (req, res) => {
  const postData = req.body;
  try {
    await dbQuery('UPDATE pcs SET name = ?, cpu = ?, gpu = ?, ram = ? WHERE id = ?', [postData.name, postData.cpu, postData.gpu, postData.ram, postData.id]);
    res.status(200).json({
      error: false,
      message: 'Updated'
    });
  } catch(error) {
    res.status(500).json({
      error: true,
      message: 'An error has occured',
    });
  }
});
export default router;
