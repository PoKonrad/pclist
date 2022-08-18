import jwt from 'jsonwebtoken';

export default class Authentication {
  /**
     * @description Middleware to require a role access a specific route
     * @param {string} requiredRole Required role to access the route
     */
  static requireRole (requiredRole) {
    return (req, res, next) => {
      const userRoles = res.locals.user.roles;
      console.log(requiredRole);
      console.warn(userRoles);
      try {
        if (userRoles.includes(requiredRole)) {
          next();
        } else {
          res.status(403).json({
            error: true,
            message: 'Permission denied'
          });
          return;
        }
      } catch (err) {
        res.status(500).json({
          error: true
        });
      }
    };
  }

  /**
     * @description Middleware to verify the JsonWebToken
     */
  static verifyJWT () {
    return (req, res, next) => {
      const token = req.headers['x-access-token'];
      if (token) {
        // eslint-disable-next-line no-undef
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).json({ error: true, message: 'Unauthorized access.' });
          }
          res.locals.user = decoded;
          next();
        });
      } else {
        res.status(401).json({ error: true, messsage: 'Missing token.' });
      }
    };
  }
}
