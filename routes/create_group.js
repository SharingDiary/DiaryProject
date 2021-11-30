let express = require('express');
let app = express();
let router = express.Router();
let fs = require('fs');
let db = require('../js/lib/db.js');
let path = require('path');
let template = require('../js/lib/template.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    let title = '그룹 생성';
    let html = template.createGroupHTML(template.loginNav(false), title, req.baseUrl);
    res.send(html);
});

router.post('/create_group_process', (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let headcount = parseInt(req.body.headcount);
    let recruitment = parseInt(req.body.recruitment);
    let member = req.body.member; 
    let groupId;

    if(member != "") { // 멤버 초대
        member = member.replace(" ", "");
        let m = member.split(','); //여러명 초대시 콤마로 멤버 구분
        if(m.length > headcount - 1) { //희망인원수보다 초대 그룹원이 더 많을 때 
            return res.send("<script>alert('more than headcount');history.back();</script>");
        } else { 
            db.query(`INSERT INTO diaryProject.group (group_id, name, description, recruitment, headcount)
                VALUES(null, ?, ?, ?, ?)`, [name, description, recruitment, headcount], function(err, result) {
                    groupId = result.insertId;
                    if(err) throw err;
                    for(let i = 0; i < m.length; i++) {
                        db.query(`INSERT INTO group_member (group_id, member_id, is_leader)
                            VALUES(?, ?, 0)`, [groupId, m[i]], function(err2, result) {
                                if(err2) throw err2;
                        });   
                    }
                    db.query(`INSERT INTO group_member (group_id, member_id, is_leader) 
                        VALUES(?, ?, 1)`, [groupId, 'yih'], function(err3, result) { //그룹 생성하는 사람이 그룹장 
                            if(err3) throw err3;
                    });                

                    if (recruitment) { //커뮤니티에서 그룹 구할 때 
                        res.redirect(`/create_group/recruitment_post_create/${groupId}`); //모집글 작성 페이지로 이동
                    } else {
                        res.redirect(`/group`); //그룹 페이지로 이동
                    }
            });
        }
    } else { //멤버 초대 안할 때 
        db.query(`INSERT INTO diaryProject.group (group_id, name, description, recruitment, headcount)
        VALUES(null, ?, ?, ?, ?)`, [name, description, recruitment, headcount], function(err, result) {
            groupId = result.insertId;
            if(err) throw err;
            
            db.query(`INSERT INTO group_member (group_id, member_id, is_leader) 
                VALUES(?, ?, 1)`, [groupId, 'yih'], function(err2, result) { //그룹 생성하는 사람이 그룹장 
                    if(err2) throw err2;
            });

            if (recruitment) { //커뮤니티에서 그룹 구할 때 
                res.redirect(`/create_group/recruitment_post_create/${groupId}`); //모집글 작성 페이지로 이동
            } else {
                res.redirect(`/group`); //그룹 페이지로 이동
            }
        });
    }
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