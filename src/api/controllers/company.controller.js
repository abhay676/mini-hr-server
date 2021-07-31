import { validationResult } from 'express-validator';
import { CompanyService } from '../services/company.service.js';
import { sendResponse } from '../utils/Response.js';

export const getCompanyInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await CompanyService.companyInfo(id);
    return sendResponse(res, 201, 'company fetched successfully', result, null);
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, 'Validation error', null, errors.array());
    }
    const jobs = await CompanyService.allJobs(req.body.company);
    const companyInfo = await CompanyService.companyDetail(req.body.company);

    jobs.company = companyInfo;
    return sendResponse(res, 200, 'jobs fetched successfully', jobs, null);
  } catch (error) {
    next(error);
  }
};
