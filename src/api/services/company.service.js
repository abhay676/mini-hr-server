import db from '../db/database.js';

export const CompanyService = {
  async newCompany(data) {
    try {
      const company = await db.Company.create(data);
      return company;
    } catch (error) {
      const key = Object.keys(error.fields);
      throw new Error(`${key[0]} already exists`);
    }
  },

  async companyDetail(id) {
    try {
      const c = await db.Company.findOne({
        where: {
          id,
        },
      });
      return c;
    } catch (error) {
      throw error;
    }
  },
  async companyInfo(id) {
    const c = await db.Company.findOne({
      where: {
        id,
      },
      include: [
        {
          model: db.User,
          attributes: [
            'fullname',
            'id',
            'designation',
            'updatedAt',
            'invitedBy',
            'role',
          ],
        },
        {
          model: db.Job,
          attributes: ['id', 'role', 'description', 'createdBy', 'updatedAt'],
        },
      ],
    });
    return c;
  },
  async allJobs(company) {
    try {
      const activeJobs = await db.Job.findAll({
        where: {
          companyId: company,
          isActive: true,
        },
        include: [
          {
            model: db.Company,
            attributes: ['companyName', 'website'],
          },
          {
            model: db.User,
            attributes: ['fullname'],
          },
        ],
      });
      const inActiveJobs = await db.Job.findAll({
        where: {
          companyId: company,
          isActive: false,
        },
        include: [
          {
            model: db.Company,
            attributes: ['companyName', 'website'],
          },
          {
            model: db.User,
            attributes: ['fullname'],
          },
        ],
      });
      return {
        activeJobs,
        inActiveJobs,
      };
    } catch (error) {
      throw error;
    }
  },
};
