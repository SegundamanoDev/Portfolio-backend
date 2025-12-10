// This wraps every async controller function
const asyncHandler = (fn) => (req, res, next) =>
  // Automatically calls next(error) if the async function fails
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
