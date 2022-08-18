import dbQuery from '../configs/database.js';
import { Router } from 'express';
import Authentication from '../middleware/auth.js';

const router = Router();

router.use(Authentication.verifyJWT());

router.get(
  '/:offset-:count/:search?',
  Authentication.requireRole('user'),
  async (req, res) => {
    const offset = parseInt(req.params.offset);
    const count = parseInt(req.params.count);

    if (req.params?.search) {
      const resp = await dbQuery('SELECT * FROM pcs WHERE name LIKE ? LIMIT ?,?', ['%' + req.params.search + '%', offset, count]);

      res.status(200).json({
        error: false,
        data: resp,
      });
      return;
    }
    
    const resp = await dbQuery('SELECT * FROM pcs LIMIT ?,?', [offset, count]);

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

router.post('/:id/edit', Authentication.requireRole('admin'), async (req, res) => {
  const postData = req.body;
  try {
    await dbQuery('UPDATE pcs SET name = ?, cpu = ?, gpu = ?, ram = ? WHERE id = ?', [postData.name, postData.cpu, postData.gpu, postData.ram, req.params.id]);
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

router.post('/:id/delete', Authentication.requireRole('admin'), async (req, res) => {
  try {
    await dbQuery('DELETE FROM pcs WHERE id = ?', [req.params.id]);
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
