const router = require('express').Router();

const verify = require('../middlewares/verifyToken');

router.get('/', verify, (req, res) => {
  res.json({
    post: {
      title: 'this is private post',
      body: 'only authorized user can view this',
    },
  });
});

module.exports = router;
