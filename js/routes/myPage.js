const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const db = require('../lib/db');
router.use(bodyParser.urlencoded({ extended: false }));

const template = require('../lib/template.js');
const style = require('../lib/style.js');
const my_template = require('../lib/my_template.js');


//my_HTML:function(nav_style, my_style, my_nickname_HTML, my_diary_HTML)
router.get('/', function(req, res) {
    var my_id = req.user;

    db.query(`SELECT * FROM member where member_id = ?`, [req.user], function (error, rows) {
        if (error) return error;
        //console.log(rows[0].nickname);
        my_nick = rows[0].nickname;
        db.query('SELECT * FROM diary where writer_id = ?', [req.user], function (error2, dlist) {
            if (error2) return error2;
            let alld = '<div><h2 style="margin-left: 40px;">내가 쓴 일기</h2><div id="mydiary_wrapper">';
            let i = 0;
            while (i < dlist.length) {
                // my_diary_list: function(date, title, body){
                alld = alld + my_template.my_diary_list(dlist[i].mod_date, dlist[i].title, dlist[i].content, req.baseUrl);
                i += 1;
            }
            alld = alld + '</div></div>';
            return res.send(template.my_HTML(style.nav, style.my, my_template.my_nickname_HTML(my_id, rows[0].nickname), alld));
        });
    });
});
  
router.post('/modify_nick', function (req, res) {
    let post = req.body;
    console.log(post.nickname);
    db.query(`UPDATE member.member SET nickname = ? WHERE member_id = ?`, [post.nickname, req.user], function (error2, rows) {
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