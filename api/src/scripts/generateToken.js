import dbQuery from '../configs/database.js';
import jwt from 'jsonwebtoken';
import { cryptoRandomStringAsync } from 'crypto-random-string';

/**
 *
 * @param {string} user Username
 * @param {number} id User id
 * @param {string[]} roles Roles array
 * @returns Token object
 */
const generateToken = async (user, id, roles) => {
  const dataToSign = {
    sub: id,
    username: user,
    roles

  };
  const refreshToken = await cryptoRandomStringAsync({ length: 40 });
  // eslint-disable-next-line no-undef
  const token = jwt.sign(dataToSign, process.env.SECRET, { expiresIn: process.env.TOKEN_LIFE });
  //await dbQuery('DELETE FROM refresh WHERE user_id = ?', [id]);
  await dbQuery('INSERT INTO refresh (user_id, token, expiration) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 4 HOUR))', [id, refreshToken]);

  const response = {
    status: 'Logged in',
    token,
    refreshToken,
    userData: dataToSign
  };
  return response;
};

export default generateToken;
