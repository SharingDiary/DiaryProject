let fs = require('fs');
let db = require('./lib/db.js');
let express = require('express');
let app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/group_create', (req, res) => {
    fs.readFile(__dirname + '/../html/group_create.html', 'utf8', function (err, data) { 
        if (err) {
          throw err; 
        }
        res.send(data);
    });
});

app.post('/create_group_process', (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let headcount = parseInt(req.body.headcount);
    let recruitment = parseInt(req.body.recruitment);
    let member = req.body.member; 

    if(member != "") { // 멤버 초대
        member = member.replace(" ", "");
        let m = member.split(','); //여러명 초대시 콤마로 멤버 구분
        if(m.length > headcount - 1) { //희망인원수보다 초대 그룹원이 더 많을 때 
            return res.send("<script>alert('more than headcount');history.back();</script>");
        } else { 
            db.query(`INSERT INTO diaryProject.group (group_id, name, description, recruitment, headcount)
                VALUES(null, ?, ?, ?, ?)`, [name, description, recruitment, headcount], function(err, result) {
                    if(err) throw err;
                    for(let i = 0; i < m.length; i++) {
                        db.query(`INSERT INTO group_member (group_id, member_id, is_leader)
                            VALUES(?, ?, 0)`, [result.insertId, m[i]], function(err, result) {
                                if(err) throw err;
                        });   
                    }
                    db.query(`INSERT INTO group_member (group_id, member_id, is_leader) 
                        VALUES(?, ?, 1)`, [result.insertId, 'yih'], function(err, result) { //그룹 생성하는 사람이 그룹장 
                            if(err) throw err;
                    });
            });
        }
    } else { //멤버 초대 안할 때 
        db.query(`INSERT INTO diaryProject.group (group_id, name, description, recruitment, headcount)
        VALUES(null, ?, ?, ?, ?)`, [name, description, recruitment, headcount], function(err, result) {
            if(err) throw err;
            
            db.query(`INSERT INTO group_member (group_id, member_id, is_leader) 
                VALUES(?, ?, 1)`, [result.insertId, 'yih'], function(err, result) { //그룹 생성하는 사람이 그룹장 
                    if(err) throw err;
            });
        });
    }

    if (recruitment) { //커뮤니티에서 그룹 구할 때 
        res.redirect(`/recruitment_post_create`); //모집글 작성 페이지로 이동
    } else {
        res.redirect(`/group`); //그룹 페이지로 이동
    }

    res.end();
});

app.get('/group', (req, res) => {
    fs.readFile(__dirname + '/../html/group.html', 'utf8', function (err, data) { 
        if (err) {
          throw err; 
        }
        res.send(data); 
    });
});

app.get('/recruitment_post_create', (req, res) => {
    fs.readFile(__dirname + '/../html/recruitment_post_create.html', 'utf8', function (err, data) { 
        if (err) {
          throw err; 
        }
        res.send(data); 
    });
});

app.listen(3000, () => {
    console.log('3000 port connected');
});
