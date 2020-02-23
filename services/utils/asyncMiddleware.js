/* eslint-disable no-undef */
/* eslint-disable no-multi-assign */
module.exports = asyncMiddleware = fn => (req, res, next) => {
  const fnReturn = fn(req, res, next);

  return Promise.resolve(fnReturn).catch(next);
};
