const router = require('express').Router();

const verify = require('../middlewares/verifyToken');
// import user model
const User = require('../models/User');

router.get('/', verify, async (req, res) => {
  // get requested user from model

  const { _id, email, name } = req.user;

  try {
    res.json({
      user: { _id, email, name },
      post: {
        title: 'this is private post',
        body: 'only authorized user can view this',
      },
    });
  } catch (error) {
    res.status(404).send('Resource not found');
  }
});

module.exports = router;
