const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const mysql = require('mysql');
const express = require('express');
const app = express();
const template = require('./lib/su_template.js');
const style_list = require('./lib/su_style_list.js');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'slee',
    password: 'Pi603-zza14!',
    database: 'slee'
});
db.connect();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/sign_up', function(request, response) {
    response.send(template.HTML(style_list.nav, style_list.sign_up))
})

app.post('/sign_up_process', function(request, response) {
    let correct_pwd = false;
    let unique_id = true;

    db.query(`SELECT * FROM member`, function(error2, members) {
        let i = 0;
        let post = request.body;
        if (post.nickname === '' || post.email === '' || post.password === '' || post.repassword === '') {
            console.log('정보를 모두 입력해주세요.');
        } else {
            while(i<members.length) {
                if (members[i].member_id === post.email) {
                    console.log('이미 가입된 아이디입니다.');
                    unique_id = false;
                    break;
                }
                i++;
            }
            if (post.password === post.repassword) {
                correct_pwd = true;
            } else {
                console.log('비밀번호가 일치하지 않습니다.');
            }
        }

        if (correct_pwd && unique_id) {
            db.query(`INSERT INTO member (member_id, password, nickname, gender)
            VALUES(?, ?, ?, 'F')`, [post.email, post.password, post.nickname], function(error, result) {
                if (error) throw error;
                return response.redirect(`/sign_up`);
                // return response.redirect(`/log_in`);
            });  
        } else {
            return response.redirect(`/sign_up`);
        } 
    });             
})
app.use(function(request, response, next) {
    response.status(404).send('Sorry cant find it.')
})
app.listen(3000, function() {
    console.log('port 3000')
});