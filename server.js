require('dotenv').config()

//passport를 이용하기 위한 모듈
const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')

const session = require('express-session')
const connection = require('./config/condb')
const engines = require('consolidate');
const LocalStrategy = require('passport-local').Strategy

app.set('views', __dirname + '/html');

// 화면 engine을 html로 설정
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// 기본 path를 /public으로 설정(css, javascript 등의 파일 사용을 위해)
app.use(express.static(__dirname + '/public'));

//session과 passport를 사용하겠다고 선언함.
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//
app.get('/', (req, res) => {
  res.render('Base.html')
})

app.get('/login', (req, res) => {
  res.render('login.html')
})

app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/main',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/Mypage', (req, res) => {
  res.render('Mypage.html') 
})

app.get('/main', function (req, res, next) {
  var id = req.user;
  res.render('main.html',{title: id})
});

//로그아웃
app.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

//serializeUser 객체는 로그인 성공시 실행되는 done(null, user);에서
//user 객체를 전달받아 세션(정확히는 req.session.passport.user)에 저장
passport.serializeUser((user, done) => {
  console.log('passport session save: ', user)
  done(null, user.id)})

//페이지를 방문할 때 마다 이 사람이 유효한 사용자인지 체크
passport.deserializeUser((id, done) => {
  console.log('passport session get id: ', id) 
    done(null, id); // 여기의 user가 req.user가 됨
})

passport.use('local-login', new LocalStrategy({ 
  usernameField: 'email',
  passwordField: 'password',
  session: true,
  passReqToCallback: true 
}, function (req, email, password, done){
  console.log(email+' = '+ password);
  let sql = "select * from member where member_id = ? and password = ?"
  if(!email || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
  
  connection.query(sql, [email, password], function(err, rows){
  console.log(err);
  if (err) return done(err);
  if (rows.length) {
    return done(null, {
      id: email
    });
  } else {
    return done(null, false, {
      message: '아이디 혹은 비밀번호가 틀립니다.'
    })
  }
  })

  }));
module.exports = app;


app.listen(3000)