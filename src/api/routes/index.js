import { Router } from 'express';
import { body } from 'express-validator';
import { verifyToken } from '../middlewares/verifyUser.js';
import upload from '../utils/multerConfig.js';
import {
  userAuth,
  validateOTP,
  addNewUser,
  dashboard,
} from '../controllers/user.controller.js';
import {
  getCompanyInfo,
  getAllJobs,
} from '../controllers/company.controller.js';
import {
  newJob,
  getJobDetails,
  applyToJob,
  uploadResume,
} from '../controllers/job.controller.js';
import { formDetail, updateForm } from '../controllers/form.controller.js';

const router = Router();

// ##################
//! Dashboard Route
// ##################

router.get('/dashboard', verifyToken, dashboard);

// ########################
//! USER ROUTES
// ########################
// User Signup/login
router.post(
  '/auth',
  body('email').isEmail().withMessage('email is required'),
  userAuth
);

router.post(
  '/verify',
  body('OTP').isNumeric().withMessage('OTP is required'),
  validateOTP
);

router.post(
  '/new-onboard',
  body('email').isEmail().withMessage('email is required'),
  body('fullname').isString().withMessage('fullname is required'),
  body('designation').isString().withMessage('designation is required'),
  body('companyName').isString().withMessage('companyName is required'),
  body('website').isString().withMessage('website is required'),
  body('location').isString().withMessage('location is required'),
  body('role').isString().withMessage('role is required'),
  addNewUser
);

// ##################
//! Company Routes
// ##################

router.get('/company/:id', verifyToken, getCompanyInfo);

router.post(
  '/company/jobs',
  body('company').isString().withMessage('companyId is required'),
  getAllJobs
);

// ##################
//! Upload Route
// ##################
router.post('/resume/upload', verifyToken, upload.single('file'), uploadResume);

// ##################
//! JOB Routes
// ##################

router.post(
  '/job/new',
  verifyToken,
  body('role').isString().withMessage('role is required'),
  body('type').isString().withMessage('type is required'),
  body('location').isString().withMessage('location is required'),
  body('description').isString().withMessage('description is required'),
  body('requirements').isString().withMessage('requirements is required'),
  body('benefits').isString().withMessage('benefits is required'),
  body('userId').isString().withMessage('companyId is required'),
  body('companyId').isString().withMessage('companyId is required'),
  newJob
);

router.get('/job/:id', getJobDetails);

// ##################
//! Form Routes
// ##################

router.get('/form/:id', verifyToken, formDetail);
router.patch(
  '/form/:id',
  verifyToken,
  body('fullName').isJSON().withMessage('fullName is required'),
  body('email').isJSON().withMessage('email is required'),
  body('phoneNumber').isJSON().withMessage('phoneNumber is required'),
  body('designation').isJSON().withMessage('designation is required'),
  body('currentCTC').isJSON().withMessage('currentCTC is required'),
  body('expectedCTC').isJSON().withMessage('expectedCTC is required'),
  body('noticePeriod').isJSON().withMessage('noticePeriod is required'),
  body('resume').isJSON().withMessage('resume is required'),
  body('linkedInUrl').isJSON().withMessage('linkedInUrl is required'),
  body('githubUrl').isJSON().withMessage('githubUrl is required'),
  body('otherLink').isJSON().withMessage('otherLink is required'),
  updateForm
);

// ##################
//! Candidates Routes
// ##################

router.post(
  '/apply',
  body('fullName').isString().withMessage('fullName is required'),
  body('email').isString().withMessage('email is required'),
  body('phoneNumber').isString().withMessage('phoneNumber is required'),
  body('resume').isString().withMessage('resume is required'),
  body('jobId').isString().withMessage('resume is required'),
  applyToJob
);

export default router;
