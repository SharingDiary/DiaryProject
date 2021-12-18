const express = require('express');
const app = express();
const router = express.Router();
const flash = require('express-flash');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
  });
});

router.use(function(req, res, next) {
    res.status(404).send('Not Found');
});

module.exports = router;