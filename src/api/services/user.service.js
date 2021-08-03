import JWT from 'jsonwebtoken';
import db from '../db/database.js';
import DashboardStaticData from '../data/dashboard.json';
import { environment } from '../../config/environment.js';

export const UserService = {
  async findUserByEmail(email) {
    try {
      const user = await db.User.findOne({
        where: {
          email,
        },
      });
      return user;
    } catch (err) {
      throw err;
    }
  },
  async saveNewUser(userData) {
    try {
      const newUser = await db.User.create(userData);
      return newUser;
    } catch (error) {
      const key = Object.keys(error.fields);
      throw new Error(`${key[0]} already exists`);
    }
  },
  async generateAuthToken(data) {
    try {
      const token = await JWT.sign(
        { email: data.email, createdAt: new Date() },
        environment.JWT_SECRET,
        {
          expiresIn: '2 days',
        }
      );
      return token;
    } catch (error) {
      throw error;
    }
  },

  async getDashboard(email) {
    try {
      const result = {};
      // get the `role`['admin', 'user']
      const { role, companyId } = await db.User.findOne({
        where: {
          email,
        },
      });
      if (role === 'admin') {
        // find all active jobs
        const { count } = await db.Job.findAndCountAll({
          where: {
            companyId,
          },
        });
        // static card data
        result.cards = DashboardStaticData.DashboardStaticData;
        result.activeJobs = {
          title: 'Active Openings',
          count,
        };
      }

      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateCompanyId(email, companyId) {
    try {
      db.User.findOne({ where: { email } }).then((user) => {
        if (user) {
          user
            .update({
              companyId,
            })
            .then(function () {
              return true;
            });
        }
      });
    } catch (error) {
      throw error;
    }
  },
  async updateUserToken(token, email) {
    try {
      const updated = await db.User.update(
        { authToken: token },
        {
          where: {
            email,
          },
        }
      );
      console.log(updated);
      return updated;
    } catch (error) {
      throw error;
    }
  },
};
