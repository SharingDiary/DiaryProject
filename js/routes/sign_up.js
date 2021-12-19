const express = require('express');
const app = express();
const router = express.Router();
const template = require('../lib/su_template.js');
const style_list = require('../lib/su_style_list.js');
const bodyParser = require('body-parser');
const db = require('../lib/db');


let rightId_display = "display: none;"
let rightPwd_display = "display: none;"

router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(request, response) {
    response.send(template.HTML(style_list.nav, style_list.sign_up(rightId_display, rightPwd_display), request.baseUrl))
})

router.post('/sign_up_process', function(request, response) {
    let correct_pwd = false;
    let unique_id = true;
    rightId_display = "display: none;"
    rightPwd_display = "display: none;"
    db.query(`SELECT * FROM member`, function(error2, members) {
        let i = 0;
        let post = request.body;
        if (post.nickname === '' || post.email === '' || post.password === '' || post.repassword === '') {
            console.log('정보를 모두 입력해주세요.');
        } else {
            while(i<members.length) {
                if (members[i].member_id === post.email) {
                    console.log('이미 가입된 아이디입니다.');
                    rightId_display = "display: inherit"
                    unique_id = false;
                    break;
                }
                i++;
            }
            if (post.password === post.repassword) {
                correct_pwd = true;
            } else {
                console.log('비밀번호가 일치하지 않습니다.');
                rightPwd_display = "display: inherit;"
            }
        }

        if (correct_pwd && unique_id) {
            db.query(`INSERT INTO member (member_id, password, nickname, gender)
            VALUES(?, ?, ?, 'F')`, [post.email, post.password, post.nickname], function(error, result) {
                if (error) throw error;
                return response.redirect(`/signin`);
            });  
        } else {
            return response.redirect(`/signup`);
        } 
    });             
})

router.use(function(request, response, next) {    
     response.status(404).send('Sorry cant find it.')
})

module.exports = router;