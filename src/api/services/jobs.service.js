import ImageKit from 'imagekit';
import { environment } from '../../config/environment.js';
import db from '../db/database.js';

export const JobService = {
  async createNewJob(data) {
    try {
      const job = await db.Job.create(data);
      return job;
    } catch (error) {
      throw error;
    }
  },
  async getJobDetails(id) {
    try {
      const job = await db.Job.findOne({
        where: {
          id,
        },
        include: [
          {
            model: db.Form,
            where: {
              isActive: true,
            },
          },
          {
            model: db.Company,
            where: {
              isActive: true,
            },
          },
        ],
      });
      return job;
    } catch (error) {
      throw error;
    }
  },
  async apply(data) {
    try {
      const applied = await db.Candidate.create(data);
      if (applied) return true;
    } catch (error) {
      const key = Object.keys(error.fields);
      throw new Error(`${key[0]} already exists`);
    }
  },
  async uploadResume(file, fileName, jobId) {
    try {
      let imagekit = new ImageKit({
        publicKey: environment.IMAGEKIT_PUBLIC_KEY,
        privateKey: environment.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: 'https://ik.imagekit.io/frm',
      });

      const upload = await imagekit.upload({
        file,
        fileName,
      });
      const data = {
        fileId: upload.fileId,
        resumeLink: upload.url,
        jobId,
        fileName: upload.name,
      };
      // make a entry in `Upload` Table
      const resume = await db.Upload.create(data);
      return {
        fileId: resume.fileId,
        resume: resume.resumeLink,
      };
    } catch (error) {
      throw error;
    }
  },
  async updateUpload(fileId, candidateId) {
    try {
      db.Upload.findOne({
        where: {
          fileId,
        },
      }).then((resume) => {
        if (resume) {
          resume
            .update({
              candidateId,
            })
            .then(() => {
              return true;
            });
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
