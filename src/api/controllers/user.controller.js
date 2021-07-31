import { validationResult } from 'express-validator';
import moment from 'moment';
import OTPGenerator from 'otp-generator';
import { UserService } from '../services/user.service.js';
import { CompanyService } from '../services/company.service.js';
import { sendResponse } from '../utils/Response.js';
import { publishMessage, consumeMessage } from '../utils/emailWorker.js';
export const userAuth = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, 'Validation error', null, errors.array());
    }
    const { email } = req.body;
    // check for email existence
    const isUserExists = await UserService.findUserByEmail(email);
    if (isUserExists) {
      return sendResponse(
        res,
        409,
        'user already exists with same email',
        null,
        [{ email }]
      );
    }
    // generate OTP and send to mail queue
    const OTP = await OTPGenerator.generate(6, {
      digits: true,
      alphabets: false,
      specialChars: false,
      upperCase: false,
    });
    const emailOptions = {
      OTP,
      email,
    };
    // save OTP to DB
    await UserService.saveOTP(emailOptions);

    publishMessage(emailOptions);

    // TODO: Temp. solution
    // consume queue
    consumeMessage();

    return sendResponse(res, 201, 'OTP send successfully', req.body, null);
  } catch (error) {
    error.statusCode = 409;
    next(error);
  }
};

export const validateOTP = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, 'Validation error', null, errors.array());
    }
    const { OTP } = req.body;
    const isOTPValid = await UserService.validateOTP(OTP);
    if (!isOTPValid) {
      return sendResponse(res, 409, 'OTP is not valid', null, [{ OTP }]);
    }
    const dataObj = {
      isVerified: true,
      verifiedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    return sendResponse(res, 200, 'OTP validated successfully', dataObj, null);
  } catch (error) {
    next(error);
  }
};

export const dashboard = async (req, res, next) => {
  try {
    const dashboard = await UserService.getDashboard(req.email);
    return sendResponse(
      res,
      200,
      'dashboard fetched successfully',
      dashboard,
      null
    );
  } catch (error) {
    next(error);
  }
};

export const addNewUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, 'Validation error', null, errors.array());
    }
    const { companyName, location, website } = req.body;
    // create company
    const company = await CompanyService.newCompany({
      companyName,
      location,
      website,
    });
    const token = await UserService.generateAuthToken(req.body);
    const userData = {
      authToken: token,
      companyId: company.id,
      ...req.body,
    };
    const user = await UserService.saveNewUser(userData);
    return sendResponse(res, 201, 'user created successfully', user, null);
  } catch (error) {
    next(error);
  }
};
