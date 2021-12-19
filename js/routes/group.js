const express = require('express');
const app = express();
const router = express.Router();
const db = require('../lib/db');
const template = require('../lib/template');
const group_template = require('../lib/group_template');
const diary_template = require('../lib/diary_template');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

router.use(bodyParser.urlencoded({ extended: false }));
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


router.get('/', (req, res) => {
    let userId =  req.user;
    let isLogging = !(req.user === undefined)
    // console.log("group user: ", userId);
    db.query(`SELECT * FROM diaryProject.group AS g LEFT JOIN group_member AS gm
        ON g.group_id = gm.group_id WHERE gm.member_id=?`, [userId], function(err, groups) {
            if(err) throw err;
            db.query(`SELECT * FROM group_member LEFT JOIN member ON group_member.member_id = member.member_id`, 
                function(err2, group_members) {
                    if(err2) 
                        throw err2;
                    
                    let title = "내 그룹";
                    let groupList = group_template.GROUP_LIST(userId, groups, group_members, req.baseUrl);
                    let body = `
                        <div id="title_div">
                            <div class="title_div_left">
                                <h2>내 그룹</h2>
                            </div>
                        </div>
                        <div id="groups_div">
                            ${groupList}
                        </div>
                        <div id="bottom_div">
                            <button onclick="location.href='/create_group';">
                                +
                            </button>
                        </div>`;
                    let script = `
                        <script>
                            function moveToGroup(url) {
                                location.href=url;
                            }
                        </script>`;

                    let html = template.HTML(template.loginNav(isLogging), title, body, script);
                    res.send(html);
            });
    });
});

router.get('/myGroup/:groupId', (req, res) => {
    // 나중에 writer_id 출력 대신 writer 이름 출력으로 수정 (join 해서)
    // group 테이블하고도 join해서 해당 그룹에 맞는 일기 보여주기
    // 지금은 내 그룹으로 전체 내 그룹 합쳐서 보여주고 있음

    let isLogging = !(req.user === undefined)
    let groupId = parseInt(req.params.groupId);
    let writer_id = req.user;
    db.query('SELECT diary_id, writer_id, group_id, title, content, weather, date_format(reg_date, "%Y/%m/%d") reg_date, date_format(mod_Date,"%Y/%m/%d") mod_date FROM diary WHERE group_id=?',[groupId], function(error,diarys) {
        if(error){
            throw error;
        }
        db.query('SELECT * FROM diaryProject.group WHERE group_id=?;', [groupId], function(err,result){
            if(err){
                console.log(result);
                throw err;
            }
            console.log(diarys);
            //console.log(diarys.length);

            let title = "그룹 일기";
            // 그룹 이름도 테이블 join해서 넣기
            let groupName = result[0].name;
            
            let i = 0;
            let body = `
                <div id="title_div">
                <div class="title_div_left">
                    <h2>${groupName}</h2>
                </div>
                </div>`;

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
                
                    body += `
                <div id="diary_div">
                <div id="diary_top_div">
                    <div class="diary_top_div_left">
                        <img>
                    </div>
                    <div class="diary_top_div_middle">
                        <h4>${diarys[i].writer_id}</h4>
                        <h5>${diarys[i].mod_date} ${weather_icon}</h5>
        
                    </div>
                    <div class="diary_top_div_right">`;

                    if(writer_id === diarys[i].writer_id) {
                        body += 
                        `<div class="div_btn_float_right">
                        <form method="post" action="/create_diary/delete_diary_process">
                            <input type="hidden" name="diary_id" value="${diarys[i].diary_id}">
                            <input type="hidden" name="writer_id" value="${diarys[i].writer_id}">
                            <input type="hidden" name="group_id" value="${diarys[i].group_id}">
                            <input type = "submit" class="diary_btn" value= "삭제">
                        </form>
                        </div>
                        <div class="div_btn_float_right"><input type = "submit" class="diary_btn" value= "수정" onclick = "location.href = '/create_diary/modify/${diarys[i].diary_id}'"></div>
                        `
                    }
                    
                    body += `</div> 
                        </div>
                    <div id="diary_middle_div">
                        <h4>${diarys[i].title}</h4>
                        <h5>${diarys[i].content}</h5>
                    </div>
                </div>`
            i = i+1;
        }

        body += `
            <div id="bottom_div">
                <button onclick="location.href='/create_diary/${groupId}';">
                        +
                </button>
            </div>`;

        let html = template.HTML(template.loginNav(isLogging), title, body, '');

        res.send(html);

        });
    });
});

router.use(function(req, res, next) {
    res.status(404).send('Not Found');
});

module.exports = router;