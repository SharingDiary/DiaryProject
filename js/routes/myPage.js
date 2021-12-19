const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const db = require('../lib/db');

const template = require('../lib/template.js');
const style = require('../lib/style.js');
const my_template = require('../lib/my_template.js');


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

//페이지를 방문할 때 마다 이 사람이 유효한 사용자인지 체크
passport.deserializeUser((id, done) => {
  console.log('passport session get id: ', id) 
    done(null, id); // 여기의 user가 req.user가 됨
});

//my_HTML:function(nav_style, my_style, my_nickname_HTML, my_diary_HTML)
router.get('/', function(req, res) {
    let my_id = req.user;

    db.query(`SELECT * FROM diaryProject.member where member_id = ?`, [req.user], function (error, rows) {
        if (error) return error;
        //console.log(rows[0].nickname);
        my_nick = rows[0].nickname;
        db.query('SELECT date_format(mod_date,"%Y/%m/%d") mod_date, title, content FROM diary where writer_id = ?', [req.user], function (error2, dlist) {
            if (error2) return error2;
            let alld = '<div><h2 style="margin-left: 40px;">내가 쓴 일기</h2><div id="mydiary_wrapper">';
            let i = 0;
            while (i < dlist.length) {
                alld = alld + my_template.my_diary_list(dlist[i].mod_date, dlist[i].title, dlist[i].content, req.baseUrl);
                i += 1;
            }
            alld = alld + '</div></div>';
            return res.send(template.my_HTML(style.nav, style.my, my_template.my_nickname_HTML(my_id, rows[0].nickname, req.baseUrl), alld));
        });
    });
});
  
router.post('/modify_nick', function (req, res) {
    let post = req.body;
    console.log(post.nickname);
    db.query(`UPDATE diaryProject.member SET nickname = ? WHERE member_id = ?`, [post.nickname, req.user], function (error2, rows) {
        if (error2) { console.log("변경실패"); return error2; }
        console.log(rows[0]);
        console.log("변경완료")
        res.redirect('/mypage')
    });
});

router.use(function(req, res, next) {
    res.status(404).send('Not Found');
});


module.exports = router;