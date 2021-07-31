export const sendResponse = (res, code, message, data, errors) => {
  return res.status(code).send({
    status: true,
    message,
    data,
    errors,
  });
};
