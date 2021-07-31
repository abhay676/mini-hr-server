import jwt from 'jsonwebtoken';
import { environment } from '../../config/environment.js';
import { UserService } from '../services/user.service.js';
import { sendResponse } from '../utils/Response.js';
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    let decoded = await jwt.verify(token, environment.JWT_SECRET);

    const { email } = decoded;
    const user = await UserService.findUserByEmail(email);
    if (!user) {
      res.status(404).send({
        status: false,
        errors: [
          {
            message: 'token was wrong',
            value: 'token',
            origin: req.originalUrl,
          },
        ],
      });
    }
    if (user) {
      req.user = user;
      req.email = email
      next();
    }
  } catch (error) {
    return sendResponse(
      res,
      401,
      'Authorization token is required',
      null,
      error
    );
  }
};
