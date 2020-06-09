const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // check if request header contain auth-token
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    // verify if token valid
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // assign payload
    next();
  } catch (error) {
    return res.status(400).send('Invalid token');
  }
};
