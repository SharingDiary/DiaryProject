require('dotenv').config()

//참고하면 좋은 사이트
//https://for-development.tistory.com/25

//passport를 이용하기 위한 모듈
const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')
const bodyParser = require('body-parser')

const session = require('express-session')
const connection = require('../config/condb')
const LocalStrategy = require('passport-local').Strategy

const template = require('./lib/template.js')
const style = require('./lib/style.js')
const my_template = require('./lib/my_template.js')

//session과 passport를 사용하겠다고 선언함.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', function(req, res) {
  console.log('/', req.user);
  var def = '비회원 | <a href="/login">login</a>';
  if(req.user !== undefined){
    console.log(req.session);
    def = req.user + `님 | <a href="/logout">logout</a>
    <a href="/mypage">MY</a>
    `;
  }
  return res.send(template.main_HTML(style.nav, def));
})

app.get('/login', function(req, res) {
  //nav_style, log_style, script
  let fmsg = req.flash();
  let feedback='';
  if(fmsg.error){ feedback = fmsg.error[0]}
  return res.send(template.login_HTML(style.nav, style.login_form_style, `<div style="color:red; margin-top: 20px; text-align:center;">${feedback}</div>`))
})

app.post('/login_access', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/signup', function(req, res) {
  return res.send('회원가입 페이지')
})

//my_HTML:function(nav_style, my_style, my_nickname_HTML, my_diary_HTML)
app.get('/mypage', function(req, res) {
  var my_id = req.user;

  connection.query(`SELECT * FROM member where member_id = ?`, [req.user], function(error, rows){
    if (error) return error;
    //console.log(rows[0].nickname);
    my_nick = rows[0].nickname;
    connection.query('SELECT * FROM diary where writer_id = ?', [req.user], function(error2, dlist){
      if (error2) return error2;
      let alld = '<div><h2 style="margin-left: 40px;">내가 쓴 일기</h2><div id="mydiary_wrapper">';
      let i = 0;
      while(i < dlist.length){
       // my_diary_list: function(date, title, body){
        alld = alld + my_template.my_diary_list(dlist[i].mod_date, dlist[i].title, dlist[i].content);
        i += 1;
      }
      alld = alld + '</div></div>';
      return res.send(template.my_HTML(style.nav, style.my, my_template.my_nickname_HTML(my_id, rows[0].nickname), alld));
    })
  })
})

app.post('/modify_nick', function(req, res) {

    let post = req.body;
    console.log(post.nickname);
    connection.query(`UPDATE member.member SET nickname = ? WHERE member_id = ?`, [post.nickname, req.user], function(error2, rows){
      if (error2) {console.log("변경실패"); return error2;}
      console.log(rows[0]);
      console.log("변경완료")
      res.redirect('/mypage')
    })
  })

//로그아웃
app.get('/logout', (req, res) => {
  req.logOut();
    req.session.save(function(err){
        if(err) throw err;
        res.redirect('/');
    })
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
  let sql = "select * from member where member_id = ? and password = ?"
  //if(!email || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
  
  connection.query(sql, [email, password], function(err, rows){
    console.log('LocalStrategy', email, password);
    if (err) { return done(err); }

    if(!rows.length) {
      console.log('no');
      return done(null, false, {message: '등록된 회원 정보와 다릅니다.'});
    }
    if (email === rows[0].member_id && password === rows[0].password) { // id 일치
        return done(null, {
          id: email,
          pw: password
        });
    }
  })

  }));

module.exports = app;

app.listen(80)