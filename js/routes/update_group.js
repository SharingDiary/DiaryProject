let express = require('express');
let app = express();
let router = express.Router();
let db = require('../lib/db');
let template = require('../lib/template');
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

router.get('/:groupId', (req, res) => {
    if(req.user === undefined) {
        return res.send("<script>alert('로그인이 필요합니다.');history.back();</script>");
    }
    let groupId = req.params.groupId;
    db.query(`SELECT * FROM diaryProject.group WHERE group_id=?`, [groupId], function(err, group) {
        db.query(`SELECT * FROM group_member WHERE group_id=?`, [groupId], function(err2, member) {
            if (err) throw err;
            let title = '그룹 수정';
            let body = `
                <form action="${req.baseUrl}/update_group_process" method="post">
                    <input type="hidden" name="groupId" value="${groupId}">
                    <div id="input_group_name">
                        <h3>그룹명</h3>
                        <input type="text" name="name" value="${group[0].name}">
                    </div>
    
                    <div id="input_group_description">
                        <h3>그룹 설명</h3>
                        <textarea name="description">${group[0].description}</textarea>
                    </div>
    
                    <div id="input_headcount">
                        <h3>희망인원수</h3>
                        <input type="text" name="headcount" value="${group[0].headcount}">
                    </div>
                    <div id="group_member">
                    <h3>그룹원</h3>
                        <textarea name="member" placeholder="그룹원 콤마(,)로 연결">`;
            for(let i = 0; i < member.length; i++) {
                body += `${member[i].member_id}, `;
            }
            body = body.replace(/,\s*$/, ''); //마지막 쉼표 제거
            body = body.trim(); //공백제거
            body += `
                </textarea>
                <input type="button" id="invitation" value="초대" onclick="searchId();">
                </div>

                <div id="submit_div">
                    <input type="submit" value="완료">
                </div>
            </form>`;
            let html = template.updateGroupHTML(template.loginNav(false), title, body);
            res.send(html); 
        });
        
  
    });
});

router.post('/update_group_process', (req, res) => {
    let groupId = req.body.groupId;
    let name = req.body.name;
    let description = req.body.description;
    let headcount = parseInt(req.body.headcount);
    let member = req.body.member; 

    if(name.length < 1) {
        return res.send("<script>alert('그룹명을 입력해주세요.');history.back();</script>");
    }
    if(description.length < 1) {
        return res.send("<script>alert('그룹 설명을 입력해주세요.');history.back();</script>");
    }
    if(!headcount) {
        return res.send("<script>alert('희망 인원수를 입력해주세요.');history.back();</script>");
    }

    db.query(`UPDATE diaryProject.group SET name=?, description=?, headcount=? WHERE group_id=?`,
    [name, description, headcount, groupId], function(err, result) {
        if(err) throw err;

        /*db.query(`SELECT count(member_id) AS currentHeadcount FROM group_member AS gm WHERE group_id=?`, 
        [groupId], function(err2, count) {
            if (err2) throw err2;*/

            db.query(`SELECT * FROM group_member WHERE group_id=?`, [groupId], function(err3, members) {
                if (err3) throw err3;
                if(member != "") { // 멤버 초대
                    member = member.trim();
                    member = member.replace(/ /g, "");
                    let m = member.split(','); //여러명 초대시 콤마로 멤버 구분
                    if(m.length > headcount) { //현재 그룹 인원보다 초대 그룹원이 더 많을 때 
                        return res.send("<script>alert('희망 인원수보다 많습니다.');history.back();</script>");
                    } else { 
                        for(let i = 0; i < m.length; i++) {
                            let found = 0;
                            for(let j = 0; j < members.length; j++) {
                                if(m[i] === members[j].member_id) { //이미 존재하는 멤버
                                    found = 1;
                                    break;
                                }
                            }
                            if (!found) {
                                db.query(`INSERT INTO group_member (group_id, member_id, is_leader)
                                            VALUES(?, ?, 0)`, [groupId, m[i]], function(err3, result2) { //그룹에 멤버 추가 
                                                if(err3) throw err3;
                                }); 
                            }
                        }    
                    }       
                }     
                res.redirect('/group');
            });
            
    });
});

router.use(function(req, res, next) {
    res.status(404).send('Not Found');
});

module.exports = router;
