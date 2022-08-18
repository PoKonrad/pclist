import dbQuery from '../configs/database.js';
import argon2 from 'argon2';
import generateToken from '../scripts/generateToken.js';
import { Router } from 'express';

const router = new Router();

router.post('/login', async (req, res) => {
  const postData = req.body;
  const dbResp = await dbQuery('SELECT id, username, password FROM users WHERE username = ?', [postData.username]);
  if (!dbResp?.length) {
    res.status(400).json({
      error: true,
      message: 'User or Password incorrect'
    });
    return;
  }
  const roles = await dbQuery('SELECT role FROM user_roles WHERE user_id = ?', [dbResp[0].id]);
  const rolesArray = roles.map(el => el.role);
  console.log(rolesArray);
  
  if (await argon2.verify(dbResp[0].password, postData.password)) {
    console.log('Success!');
    const token = await generateToken(dbResp[0].username, dbResp[0].id, rolesArray);
    res.status(200).json(token);
  } else {
    res.status(400).json({
      error: true,
      message: 'User or Password incorrect'
    });
  }
});
router.post('/register', async (req, res) => {
  const userData = req.body;
  console.log(await dbQuery('SELECT * FROM users WHERE username = ?', [userData.username]));
  // Check if user already exists
  try {
    const usersWithName = await dbQuery('SELECT * FROM users WHERE username = ?', [userData.username]);
    if (usersWithName[0]) {
      res.status(409).json({
        error: true,
        message: 'User already exists'
      });
      return;
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      message: 'Something went wrong'
    });
    return;
  }

  try {
    // Insert user
    const resp = await dbQuery('INSERT INTO users (username, password) VALUES (?, ?) RETURNING id', [userData.username, await argon2.hash(userData.password)]);
    console.log(resp);

    // Assign user role
    await dbQuery('INSERT INTO user_roles (user_id, role) VALUES (?, 1)', [resp[0].id]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: true,
      message: 'Something went wrong'
    });
    return;
  }
  res.status(200).json({
    error: false,
    message: 'User succesfully created'
  });
});

router.post('/refreshToken', async (req, res) => {
  if (!req.body.refreshToken) {
    res.status(400).json({
      error: true,
      message: 'No refresh token'
    });
    return;
  }
  const refToken = req.body.refreshToken;

  const dbResp = await dbQuery('SELECT refresh.token, refresh.expiration as expiration, refresh.user_id as user_id, users.username FROM refresh INNER JOIN users ON users.id = user_id WHERE refresh.token = ?', [refToken]);

  console.log(dbResp[0]);
  // Check if token expired
  if (new Date(dbResp[0].expiration) < new Date()) {
    res.status(400).json('Token Expired');
    return;
  }
  
  const roles = await dbQuery('SELECT role FROM user_roles WHERE user_id = ?', [dbResp[0].user_id]);
  const rolesArray = roles.map(el => el.role);
  console.log(rolesArray);

  const token = await generateToken(dbResp[0].username, dbResp[0].user_id, rolesArray);
  res.status(200).json(token);
});

router.post('/logOff', async (req, res) => {
  const userData = req.body;
  await dbQuery('DELETE FROM refresh WHERE token = ?', [userData.refreshToken]);
  res.status(200).json('Logged out');
});

export default router;
