let http = require('http');
let fs = require('fs');
let url = require('url');
let qs = require('querystring');
let db = require('./lib/db.js');

let app = http.createServer(function(request, response) {
    let _url = request.url;
    let pathname = url.parse(_url, true).pathname;

    if(pathname === '/group_create') {
        fs.readFile(__dirname + '/../html/group_create.html', function (err, data) { 
            if (err) {
              throw err; 
            }
            response.end(data, 'utf-8');
        });
    } else if(pathname === '/create_group') {
        let body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            let post = qs.parse(body);
            let name = post.name;
            let description = post.description;
            let headcount = parseInt(post.headcount);
            let recruitment = parseInt(post.recruitment);
            let member = post.member; 

            if(member != "") { // 멤버 초대
                member = member.replace(" ", "");
                let m = member.split(','); //여러명 초대시 콤마로 멤버 구분
                if(m.length > headcount - 1) { //희망인원수보다 초대 그룹원이 더 많을 때 
                    let warning = `
                    <script>
                    alert("more than headcount");
                    history.back();
                    </script>
                    `;
                    response.end(warning);
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
                response.writeHead(302, {Location: `/recruitment_post_create`}); //모집글 작성 페이지로 이동
            } else {
                response.writeHead(302, {Location: `/group`}); //그룹 페이지로 이동
            }
            response.end();
        });
    } else if (pathname ==='/group') {
        fs.readFile(__dirname + '/../html/group.html', function (err, data) { 
            if (err) {
              throw err; 
            }
            response.end(data, 'utf-8'); 
        });
    } else if(pathname ==='/recruitment_post_create') {
        fs.readFile(__dirname + '/../html/recruitment_post_create.html', function (err, data) { 
            if (err) {
              throw err; 
            }
            response.end(data, 'utf-8'); 
        });
    } else { // 매칭되는 주소가 없으면
        response.writeHead(404);
        response.end('Not found');
    }
});

app.listen(3000);