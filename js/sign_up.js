const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'slee',
    password: 'Pi603-zza14!',
    database: 'slee'
});
db.connect();

let app = http.createServer(function(request, response) {
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let pathname = url.parse(_url, true).pathname;

    if(pathname === "/sign_up") {
        response.writeHead(200);
        fs.readFile(__dirname + '/../html/signup.html', function (err, data) { 
            if (err) throw err; 
            response.end(data, 'utf-8');
        });
    } else if (pathname === "/sign_up_process") {
        let body='';
        let correct_pwd = false;
        let unique_id = true;
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            db.query(`SELECT * FROM member`, function(error2, members) {
                let i = 0;
                var post = qs.parse(body);
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
                        response.writeHead(302, {Location: `/log_in`});
                        response.end();
                    });  
                } else {
                    response.writeHead(302, {Location: `/sign_up`});
                    response.end();
                } 
            });    
        });
    } else if (pathname === "/sign_up_id_check"){
        console.log('suprise!');
        response.writeHead(302, {Location: `/sign_up`});
        response.end();
    } else if (pathname === "/log_in") {
        response.writeHead(200);
        fs.readFile(__dirname + '/../html/login.html', function (err, data) { 
            if (err) throw err; 
            response.end(data, 'utf-8');
        });
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});

app.listen(3000);