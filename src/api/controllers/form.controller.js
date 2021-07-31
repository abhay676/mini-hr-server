import { FormService } from '../services/form.service.js';
import { sendResponse } from '../utils/Response.js';

export const formDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const form = await FormService.fetchFields(id);
    return sendResponse(res, 200, 'form fetched successfully', form, null);
  } catch (error) {
    next(error);
  }
};

export const updateForm = async (req, res, next) => {
  try {
    const id = req.params.id;
    const formUpdate = await FormService.updateForm(req.body, id);
    return sendResponse(
      res,
      200,
      'form updated successfully',
      formUpdate,
      null
    );
  } catch (error) {
    next(error);
  }
};
