import { validationResult } from 'express-validator';
import fs from 'fs';
import { JobService } from '../services/jobs.service.js';
import { FormService } from '../services/form.service.js';
import { sendResponse } from '../utils/Response.js';

export const newJob = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, 'Validation error', null, errors.array());
    }
    const job = await JobService.createNewJob(req.body);
    // create job form
    const form = await FormService.createForm(job.id);
    const result = {
      ...job.dataValues,
      formId: form.id,
    };
    return sendResponse(res, 201, 'job created successfully', result, null);
  } catch (error) {
    next(error);
  }
};

export const getJobDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    const job = await JobService.getJobDetails(id);
    return sendResponse(res, 200, 'job fetched successfully', job, null);
  } catch (error) {
    next(error);
  }
};

export const applyToJob = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, 'Validation error', null, errors.array());
    }
    const applied = await JobService.apply(req.body);
    const updateUpload = await JobService.updateUpload(
      req.body.fileId,
      applied.id
    );
    console.log(updateUpload);
    if (applied && updateUpload)
      return sendResponse(res, 201, 'Candidate added successfully', null, null);
  } catch (error) {
    next(error);
  }
};

export const uploadResume = async (req, res, next) => {
  try {
    const fileName = req.file.filename;
    const resume = new Buffer(fs.readFileSync(req.file.path)).toString(
      'base64'
    );
    const file = await JobService.uploadResume(
      resume,
      fileName,
      req.body.jobId
    );
    return sendResponse(res, 201, 'resume uploaded successfully', file, null);
  } catch (error) {
    next(error);
  }
};
