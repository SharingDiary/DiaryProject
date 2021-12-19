const express = require('express');
const asyncify = require('express-asyncify');
const app = express();
const router = asyncify(express.Router());
const db = require('../lib/db');
const template = require('../lib/template');
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
    if(req.user === undefined) {
        return res.send("<script>alert('로그인이 필요합니다.');history.back();</script>");
    }
    let title = '그룹 생성';
    let html = template.createGroupHTML(template.loginNav(false), title, req.baseUrl);
    res.send(html);
});

router.post('/create_group_process', async (req, res) => {
    if(req.user === undefined) {
        return res.send("<script>alert('로그인이 필요합니다.');history.back();</script>");
    }
    let name = req.body.name;
    let description = req.body.description;
    let headcount = parseInt(req.body.headcount);
    let recruitment = parseInt(req.body.recruitment);
    let member = req.body.member; 
    let userId = req.user;

    if(name.length < 1) {
        return res.send("<script>alert('그룹명을 입력해주세요.');history.back();</script>");
    }
    if(description.length < 1) {
        return res.send("<script>alert('그룹 설명을 입력해주세요.');history.back();</script>");
    }
    if(!headcount) {
        return res.send("<script>alert('희망 인원수를 입력해주세요.');history.back();</script>");
    }

    let promise = new Promise(function(resolve, reject) {
        db.query(`INSERT INTO diaryProject.group (group_id, name, description, recruitment, headcount)
            VALUES(null, ?, ?, ?, ?)`, [name, description, recruitment, headcount], function(err, result) {
            if (err) {
                reject(err);
            } else {
                res.insertId = result.insertId;
                resolve(res.insertId);
            }
        });
    });

    let groupId = await promise;
    db.query(`SELECT * FROM member`, function(err2, members) {
        if(err2) throw err2;
        if(member != "") { // 멤버 초대할 때
            member = member.trim();
            member = member.replace(/ /g, ""); //공백 제거
            let m = member.split(','); //여러명 초대시 콤마로 멤버 구분
            if(m.length > headcount - 1) { //희망인원수보다 초대 그룹원이 더 많을 때 
                 return res.send("<script>alert('희망 인원수보다 많습니다.');history.back();</script>");
            } else { 
                for(let i = 0; i < m.length; i++) {
                    let found = 0;
                    for(let j = 0; j < members.length; j++) {
                        if(m[i] === members[j].member_id) {
                            found = 1;
                            break;
                        }
                    }
                    if(found) {
                        db.query(`INSERT INTO group_member (group_id, member_id, is_leader)
                        VALUES(?, ?, 0)`, [groupId, m[i]], function(err3, result) { //그룹원 추가 
                            if(err2) throw err2;
                        });  
                    }
                }  
            }
        }  
        db.query(`INSERT INTO group_member (group_id, member_id, is_leader) 
                VALUES(?, ?, 1)`, [groupId, userId], function(err5, result) { //그룹 생성하는 사람이 그룹장 
                    if(err5) throw err5;
        });
        
        if (recruitment) { //커뮤니티에서 그룹 구할 때 
            res.redirect(`/create_group/recruitment_post_create/${groupId}`); //모집글 작성 페이지로 이동
        } else {
            res.redirect(`/group`); //그룹 페이지로 이동
        }
    });
});

router.get('/recruitment_post_create/:groupId', (req, res) => {
    let groupId = req.params.groupId;
    let title = '그룹원 모집글 생성';
    let body = `<h2 id="title">그룹원 모집글 작성</h2>
                <form action="${req.baseUrl}/create_recruitment_post_process" method="post">
                    <input type="hidden" name="groupId" value="${groupId}">

                    <div id="input_title">
                        <h3>제목</h3>
                        <input type="text" name="title" placeholder="제목을 입력해주세요.">
                    </div>

                    <div id="input_content">
                        <h3>내용</h3>
                        <textarea name="content" placeholder="내용을 입력해주세요."></textarea>
                    </div>

                    <div id="submit_div">
                        <input type="submit" value="완료">
                    </div>
                    
                </form>`;
    let html = template.HTML(template.loginNav(false), title, body);
    res.send(html);
});

router.post('/create_recruitment_post_process', function(req, res){
    let groupId = req.body.groupId;
    let title = req.body.title;
    let content = req.body.content;

        // recruitment_post 테이블에 insert하기
        db.query(`INSERT INTO recruitment_post (post_id, group_id, title, content, reg_date) VALUES(null, ?, ?, ?, NOW())`, 
            [groupId, title, content], function(error, result){
            if(error){
                throw error;
            }

            console.log("그룹("+groupId+")의 그룹원 모집글 등록 완료");

            res.redirect('/community');
        });
    
});

router.use(function(req, res, next) {
    res.status(404).send('Not Found');
});

module.exports = router;