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

module.exports = () => {
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
}