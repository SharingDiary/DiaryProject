let express = require('express');
let router = express.Router();
let template = require('../lib/template.js');
let diary_template = require('../lib/diary_template.js');
let db = require('../lib/db.js');
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

router.get('/:groupId', function(req, res) {
    // diary_id 증가 시키기
    let title = "일기 쓰기";
    let writer_id = req.user;
    //let group_id = 50;
    let group_id = req.params.groupId;

    let body = `
        <div id="wrapper">
        <h2 id="title">일기 작성</h2>
        <form action="/create_diary/create_diary_process" method="post">
            <input type="hidden" name="writer_id" value="${writer_id}">
            <input type="hidden" name="group_id" value="${group_id}">
            <div id="top_div">
                <div class="top_div_left">
                    <h4>제목</h4>
                    <input type="text" name="title" placeholder="일기 제목을 입력해주세요.">
                </div>
                <div class="top_div_right">
                    <h4>오늘의 날씨</h4>
                    <div class="weather">
                            <input type="hidden" value="" id="weather" name="weather">
                            <input type="button" value="☀️" id="sunny" onclick="weatherChange('sunny')">
                            <input type="button" value="🌥" id="cloudy" onclick="weatherChange('cloudy');">
                            <input type="button" value="🌧" id="rainy" onclick="weatherChange('rainy');">
                            <input type="button" value="⛈" id="thunder" onclick="weatherChange('thunder');">
                            <input type="button" value="🌨" id="snowy" onclick="weatherChange('snowy');">
                        </div>
                </div>
            </div>
            <div id="middle_div">
                <h4>내용</h4>
                <textarea name="content" placeholder="내용을 입력해주세요."></textarea>
            </div>
            <div id="bottom_div">
                <input type="submit" value="완료">
            </div>
        </form>
    </div>
    `

    let diary_register = diary_template.REGISTER(title, body);

    return res.send(diary_register);
});

router.post('/create_diary_process', function(req, res) {
    let group_id = req.body.group_id;
    let writer_id = req.body.writer_id;
    let diary_id = req.body.diary_id;
    let title = req.body.title;
    let content = req.body.content;
    let weather = req.body.weather;
    console.log("title:" + title);
    console.log("diary_id" + diary_id);
    console.log("group_id" + group_id);
    console.log("writer_id" + writer_id);
        
        db.query(`INSERT INTO diary (writer_id, group_id, title, content, weather, reg_date, mod_date) VALUES(?, ?, ?, ?, ?, NOW(), NOW())`, 
            [writer_id,group_id,title, content, weather], function(error, topics){
            if(error){
                throw error;
            }
     
            res.writeHead(302, {Location: `/group/myGroup/${group_id}`});
            res.end();
        });

});

router.get('/modify/:postId', function(req, res) {
    let title = "일기 수정";
    //let _url = request.url;
    //let queryData = url.parse(_url, true).query;
    let diary_id = req.params.postId;
    let writer_id = req.user;

    // '만약 현재 로그인한 유저가 작성자이면' 추가
    db.query('SELECT * FROM diary',function(err,diarys){
        if(err){
            console.log(err);
            throw err;
        }
        db.query('SELECT * FROM diary WHERE diary_id=?',[diary_id],function(err2,diary){
            if(err2){
                console.log(err2);
                throw err2;
            }

            let update_diary = diary_template.DIARY_UPATE(title,`
            <form action="/create_diary/diary_modify_process" method="post">
            <div id="top_div">
                <div class="top_div_left">
                    <h4>제목</h4>
                    <input type="hidden" name="diary_id" value="${diary_id}">
                    <input type="hidden" name="writer_id" value="${diary[0].writer_id}">
                    <input type="hidden" name="group_id" value="${diary[0].group_id}">
                    <input type="text" name="title" placeholder="수정할 일기 제목을 입력해주세요." value="${diary[0].title}">
                </div>
                <div class="top_div_right">
                    <h4>오늘의 날씨</h4>
                    <div class="weather">
                        <input type="hidden" value="" id="weather" name="weather">
                        <input type="button" value="☀️" id="sunny" onclick="weatherChange('sunny')">
                        <input type="button" value="🌥" id="cloudy" onclick="weatherChange('cloudy');">
                        <input type="button" value="🌧" id="rainy" onclick="weatherChange('rainy');">
                        <input type="button" value="⛈" id="thunder" onclick="weatherChange('thunder');">
                        <input type="button" value="🌨" id="snowy" onclick="weatherChange('snowy');">
                    </div>
                </div>
            </div>
            <div id="middle_div">
                <h4>내용</h4>
                <textarea name="content" placeholder="수정할 내용을 입력해주세요.">${diary[0].content}</textarea>
            </div>
            <div id="bottom_div">
                <input type="submit" value="완료">
            </div>
        </form>`);   
        res.writeHead(200);
        res.end(update_diary);
    });
    });
});

router.post('/diary_modify_process', function(req, res) {
    let group_id = req.body.group_id;
    let writer_id = req.body.writer_id;
    let diary_id = req.body.diary_id;
    let title = req.body.title;
    let content = req.body.content;
    let weather = req.body.weather;
    console.log("title:" + title);
    console.log("diary_id" + diary_id);
    console.log("group_id" + group_id);
    console.log("writer_id" + writer_id);

        db.query("UPDATE diary SET title=?, content=?, weather=?, mod_date=curdate() WHERE diary_id=?",
        [title,content,weather,diary_id],function(err){
            if(err){
                console.log(err);
                throw err;
            }
            res.writeHead(302,{Location: `/group/mygroup/${group_id}`});
            res.end()
        });
});

router.post('/delete_diary_process', function(req, res) {
    let group_id = req.body.group_id;
    let writer_id = req.body.writer_id;
    let diary_id = req.body.diary_id;
    let title = req.body.title;
    let content = req.body.content;
    let weather = req.body.weather;
    console.log("title:" + title);
    console.log("diary_id" + diary_id);
    console.log("group_id" + group_id);
    console.log("writer_id" + writer_id);

    db.query(`DELETE FROM diary WHERE diary_id=?`,[diary_id], function(error, diary){
        if(error){
            console.log(error);
            throw error;
        }
        res.writeHead(302, {Location: `/group/mygroup/${group_id}`});
        res.end();
    });
});

module.exports = router;