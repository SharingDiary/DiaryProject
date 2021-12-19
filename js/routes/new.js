const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');
const diary_template = require('../lib/diary_template.js');
const db = require('../lib/db.js');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

router.use(express.urlencoded({ extended: false }));
router.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());

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


router.get('/', function(req, res) {
    // 나중에 writer_id 출력 대신 writer 이름 출력으로 수정 (join 해서)
    // 로그인 했는지 안했는지
    let title = "NEW!";
    let diary_list = '';

    if(req.user === undefined){
        return res.redirect('/signin');
    }
    let userId = req.user;
    db.query('SELECT * FROM group_member WHERE member_id =?',[userId], function(err,groups){
        if(err){
            throw err;
        }
        let k = 0;
        while(k<groups.length){
            let groupId = groups[k].group_id;
            db.query('SELECT diary_id, writer_id, diary.group_id, title, content, weather, date_format(reg_date, "%Y/%m/%d") reg_date, date_format(mod_date,"%Y/%m/%d") mod_date, diaryProject.group.name FROM diary LEFT JOIN diaryProject.group ON diary.group_id=diaryProject.group.group_id WHERE date_format(reg_date, "%Y-%m-%d") = CURDATE() AND diaryProject.group.group_id=?;', [groupId],function(error,diarys) {
                if(error){
                    throw error;
                }
            
                console.log(diarys);
                //console.log(diarys.length);
        
                // 그룹 이름도 테이블 join해서 넣기
                //let groupName = "그룹1"
                
                let i = 0;
                while(i<diarys.length){
                    // weather은 null 허용
                    let weather_icon = "x";
                    if (diarys[i].weather ==='sunny')
                       weather_icon = "☀️";
                    else if (diarys[i].weather ==='cloudy')
                        weather_icon = "🌥";
                    else if (diarys[i].weather ==='rainy')
                        weather_icon = "🌧";
                    else if (diarys[i].weather ==='thunder')
                        weather_icon = "⛈";
                    else if(diarys[i].weather === 'snowy')
                        weather_icon = "🌨";
                    diary_list = diary_list + 
                    `
                    <div id="diary_div">
                        <div id="diary_top_div">
                            <div class="diary_top_div_left">
                                <img>
                            </div>
                            <div class="diary_top_div_middle">
                                <h4>${diarys[i].writer_id} / ${diarys[i].name}</h4>
                                <h5>${diarys[i].reg_date} ${weather_icon}</h5>
                            </div>
                            
                        </div>
                        <div id="diary_middle_div">
                            <h4>${diarys[i].title}</h4>
                            <h5>${diarys[i].content}</h5>
                        </div>
                    </div>
                    `;
                i = i+1;
                }
    
            });

            k = k + 1;
        }
        let NEW_DIARY = diary_template.NEW_DIARY(title, diary_list);    
        res.send(NEW_DIARY);
    });
});

module.exports = router;