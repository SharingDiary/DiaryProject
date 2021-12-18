let express = require('express');
let app = express();
let router = express.Router();
let fs = require('fs');
let db = require('../lib/db');
let template = require('../lib/template');
var diary_template = require('../lib/diary_template.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    let userId = 'yih'
    db.query(`SELECT * FROM diaryProject.group AS g LEFT JOIN group_member AS gm
        ON g.group_id = gm.group_id WHERE gm.member_id=?`, [userId], function(err, groups) {
            if(err) throw err;
            db.query(`SELECT group_id, count(member_id) AS currentHeadcount 
            FROM group_member AS gm GROUP BY group_id`, function(err2, result) {
                if(err2) throw err2;
                
                let groupList = template.groupList(userId, groups, result, req.baseUrl);
                let title = "내 그룹";
                let body = `
                <div id="title_div">
                    <div class="title_div_left">
                        <h2>내 그룹</h2>
                    </div>
                </div>
                <div id="groups_div">
                    ${groupList}
                </div>
                `;
                let html = template.groupHTML(template.loginNav(false), title, body);
                res.send(html);
            });
    });
});

router.get('/myGroup/:groupId', (req, res) => {
    // 나중에 writer_id 출력 대신 writer 이름 출력으로 수정 (join 해서)
    // group 테이블하고도 join해서 해당 그룹에 맞는 일기 보여주기
    // 지금은 내 그룹으로 전체 내 그룹 합쳐서 보여주고 있음
    var groupId = parseInt(req.params.groupId);
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

            var title = "그룹 일기";
            // 그룹 이름도 테이블 join해서 넣기
            var groupName = result[0].name;
            
            var i = 0;
            var diary_list = '';
            while(i<diarys.length){
                // weather은 null 허용
                var weather_icon = "x";
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
                
                diary_list = diary_list + `<div id="diary_div">
                <div id="diary_top_div">
                    <div class="diary_top_div_left">
                        <img>
                    </div>
                    <div class="diary_top_div_middle">
                        <h4>${diarys[i].writer_id}</h4>
                        <h5>${diarys[i].mod_date} ${weather_icon}</h5>
        
                    </div>` +
                    // 글쓴이 확인하고 수정 삭제
                    `<div class="diary_top_div_right">
                        
                        <div class="div_btn_float_right">
                        <form method="post" action="/create_diary/delete_diary_process">
                            <input type="hidden" name="diary_id" value="${diarys[i].diary_id}">
                            <input type="hidden" name="writer_id" value="${diarys[i].writer_id}">
                            <input type="hidden" name="group_id" value="${diarys[i].group_id}">
                            <input type = "submit" class="diary_btn" value= "삭제">
                        </form></div>
                        <div class="div_btn_float_right"><input type = "submit" class="diary_btn" value= "수정" onclick = "location.href = '/create_diary/modify/${diarys[i].diary_id}'"></div>
                        
                    </div>` +
                ` </div>
                <div id="diary_middle_div">
                    <h4>${diarys[i].title}</h4>
                    <h5>${diarys[i].content}</h5>
                </div>
            </div>`
            i = i+1;
        }

        var MYGROUP = diary_template.MYGROUP(title,groupName,diary_list,groupId);

    
        res.writeHead(200);
        res.end(MYGROUP);

        });
    });
});

router.use(function(req, res, next) {
    res.status(404).send('Not Found');
});

module.exports = router;