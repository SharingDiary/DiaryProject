let express = require('express');
let app = express();
let router = express.Router();
let db = require('../lib/db');
let template = require('../lib/template');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/:groupId', (req, res) => {
    let groupId = req.params.groupId;
    db.query(`SELECT * FROM diaryProject.group WHERE group_id=?`, [groupId], function(err, group) {
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
                        <textarea name="member"></textarea>
                        <button id="invitation">초대</button>
                    </div>
    
                    <div id="submit_div">
                        <input type="submit" value="완료">
                    </div>
                </form>`;
        let html = template.updateGroupHTML(template.loginNav(false), title, body);
        res.send(html);       
    });
});

router.post('/update_group_process', (req, res) => {
    let groupId = req.body.groupId;
    let name = req.body.name;
    let description = req.body.description;
    let headcount = parseInt(req.body.headcount);
    let member = req.body.member; 
    let userId = 'yih'
    db.query(`UPDATE diaryProject.group SET name=?, description=?, headcount=? WHERE group_id=?`,
    [name, description, headcount, groupId], function(err, result) {
        if(err) throw err;

        db.query(`SELECT count(member_id) AS currentHeadcount FROM group_member AS gm WHERE group_id=?`, 
        [groupId], function(err2, count) {
            if (err2) throw err2;

            if(member != "") { // 멤버 초대
                member = member.replace(" ", "");
                let m = member.split(','); //여러명 초대시 콤마로 멤버 구분
                if(m.length > headcount - count[0].currentHeadcount) { //현재 그룹 인원보다 초대 그룹원이 더 많을 때 
                    return res.send("<script>alert('more than headcount');history.back();</script>");
                } else { 
                    for(let i = 0; i < m.length; i++) {
                        db.query(`INSERT INTO group_member (group_id, member_id, is_leader)
                            VALUES(?, ?, 0)`, [groupId, m[i]], function(err3, result2) { //그룹에 멤버 추가 
                                if(err3) throw err3;
                        });   
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
