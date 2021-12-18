var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var diary_template = require('../lib/diary_template.js');
var db = require('../lib/db.js');

router.get('/', function(req, res) {
    // 나중에 writer_id 출력 대신 writer 이름 출력으로 수정 (join 해서)
    db.query('SELECT diary_id, writer_id, diary.group_id, title, content, weather, date_format(reg_date, "%Y/%m/%d") reg_date, date_format(mod_date,"%Y/%m/%d") mod_date, diaryProject.group.name FROM diary LEFT JOIN diaryProject.group ON diary.group_id=diaryProject.group.group_id WHERE date_format(reg_date, "%Y-%m-%d") = CURDATE();', function(error,diarys) {
        if(error){
            throw error;
        }
        

        console.log(diarys);
        //console.log(diarys.length);

        // 그룹 이름도 테이블 join해서 넣기
        //var groupName = "그룹1"
        var title = "NEW!";
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

        var NEW_DIARY = diary_template.NEW_DIARY(title, diary_list);

    
        res.writeHead(200);
        res.end(NEW_DIARY);
    });
});

module.exports = router;