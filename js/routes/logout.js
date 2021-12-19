const express = require('express');
const app = express();
const router = express.Router();
const flash = require('express-flash');
const bodyParser = require('body-parser');
const passport = require('passport');

const session = require('express-session');
router.use(bodyParser.urlencoded({ extended: false }));

//session과 passport를 사용하겠다고 선언함.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.urlencoded({ extended: false }));
router.use(flash());
router.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('passport session save: ', user)
  done(null, user.id)
});

//페이지를 방문할 때 마다 이 사람이 유효한 사용자인지 체크
passport.deserializeUser((id, done) => {
console.log('passport session get id: ', id) 
  done(null, id); // 여기의 user가 req.user가 됨
});

router.get('/', (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/signin');
  });
});

router.use(function(req, res, next) {
    res.status(404).send('Not Found');
});

module.exports = router;