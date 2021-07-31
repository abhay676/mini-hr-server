import db from '../db/database.js';

export const FormService = {
  async createForm(jobId) {
    try {
      const form = await db.Form.create({ jobId });
      return form;
    } catch (error) {
      throw error;
    }
  },
  async fetchFields(id) {
    try {
      const fields = await db.Form.findOne({
        where: {
          id,
        },
      });
      return fields;
    } catch (error) {
      throw error;
    }
  },
  async updateForm(data, id) {
    try {
      db.Form.findOne({
        where: {
          id,
        },
      }).then((form) => {
        form.update(data).then((success) => {
          return true;
        });
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
