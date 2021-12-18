const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const bodyParser = require('body-parser');

const session = require('express-session');
const db = require('../lib/db');
const LocalStrategy = require('passport-local').Strategy;

const template = require('../lib/template.js');
const style = require('../lib/style.js');
const my_template = require('../lib/my_template.js');

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

/*
router.get('/', function(req, res) {
  console.log('/', req.user);
  var def = '비회원 | <a href="/login">login</a>';
  if(req.user !== undefined){
    console.log(req.session);
    def = req.user + `님 | <a href="/logout">logout</a>
    <a href="/mypage">MY</a>
    `;
  }
  return res.send(template.main_HTML(style.nav, def));
})*/

router.get('/', function(req, res) {
  //nav_style, log_style, script
  let fmsg = req.flash();
  let feedback='';
  if(fmsg.error){ feedback = fmsg.error[0]}
  return res.send(template.login_HTML(style.nav, style.login_form_style, `<div style="color:red; margin-top: 20px; text-align:center;">${feedback}</div>`, req.baseUrl))
});

router.post('/sign_in_access', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
}));


//serializeUser 객체는 로그인 성공시 실행되는 done(null, user);에서
//user 객체를 전달받아 세션(정확히는 req.session.passport.user)에 저장
passport.serializeUser((user, done) => {
    console.log('passport session save: ', user)
    done(null, user.id)
});

//페이지를 방문할 때 마다 이 사람이 유효한 사용자인지 체크
passport.deserializeUser((id, done) => {
  console.log('passport session get id: ', id) 
    done(null, id); // 여기의 user가 req.user가 됨
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true,
    passReqToCallback: true
}, function (req, email, password, done) {
    let sql = "select * from member where member_id = ? and password = ?"

    db.query(sql, [email, password], function (err, rows) {
        console.log('LocalStrategy', email, password);
        if (err) { return done(err); }

        if (!rows.length) {
            console.log('no');
            return done(null, false, { message: '등록된 회원 정보와 다릅니다.' });
        }
        if (email === rows[0].member_id && password === rows[0].password) { // id 일치
            return done(null, {
                id: email,
                pw: password
            });
        }
    });

}));

router.use(function(req, res, next) {
    res.status(404).send('Not Found');
});


module.exports = router;