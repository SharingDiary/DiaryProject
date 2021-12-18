const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');

const session = require('express-session');
const db = require('./db');

let index = function () {
    app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

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

};

module.exports = index;