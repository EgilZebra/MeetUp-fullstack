/* const sendResponse = (statusCode, data) => {
    return {
      statusCode: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  };
  
  const sendError = (statusCode, data) => {
    return {
      statusCode: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  };
  
  export { sendResponse, sendError }; */

  const sendResponse = (res, statusCode, data) => {
    return res.status(statusCode).json(data);
};

const sendError = (res, statusCode, errorMessage) => {
    return res.status(statusCode).json({ success: false, error: errorMessage });
};

module.exports = { sendResponse, sendError };
