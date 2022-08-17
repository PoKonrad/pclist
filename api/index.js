import dotenv from 'dotenv';
import express, { json } from 'express';
import auth from './src/controllers/auth.js';
import data from './src/controllers/data.js';
import users from './src/controllers/users.js';

dotenv.config();
const app = express();
app.use(json({
  limit: '1MB'
}));

app.use('/auth', auth);
app.use('/data', data);
app.use('/users', users);

app.listen(8000);
