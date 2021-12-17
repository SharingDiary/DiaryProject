var express = require('express');
var app = express();
var fs = require('fs');
var template = require('./lib/template.js');
var community_template = require('./lib/community_template.js');
var path = require('path');
var qs = require('querystring');
var mysql = require('mysql');

var db = mysql.createConnection({
    host:'localhost',
    user:'shary_admin',
    password:'shary333',
    database:'shary'
});

db.connect();

app.get('/', function(req, res){
    var title = '메인페이지';
    var body = '<p>셰리 서비스 소개</p>';

    var html = template.HTML(template.loginNav(false), title, body);
    res.send(html);
});

app.get('/new', function(req, res){
    var title = 'NEW';
    var body = '<p>최신 일기 보기</p>';

    var html = template.HTML(template.loginNav(true), title, body);
    res.send(html);
});

app.get('/group', function(req, res){
    var title = '내그룹';
    var body = '<p>그룹 보기</p>';

    var html = template.HTML(template.loginNav(false), title, body);
    res.send(html);
});

app.get('/community', function(request, response) {
    var title = '커뮤니티';
    let body = `<div class="search-group">
        <p>그룹 검색</p>
        </div>
        <div class="group-container">`;

    db.query(`SELECT * FROM recruitment_post`, function(error, posts) {
        if (error) throw error;
        db.query(`SELECT * FROM recruitment_post LEFT JOIN shary.group ON recruitment_post.group_id = group.group_id`, function(error2, groups) {
            db.query(`SELECT * FROM recruitment_post_reply`, function(error2, replys) {
                let i = 0;
                // console.log(replys)
                while(i<posts.length) {
                    console.log(posts[i])
                    let k = 0;
                    let _id = posts[i].post_id;
                    let writerId = posts[i].writer_id;
                    let title = posts[i].title;
                    let desc = posts[i].content;
                    let people = groups[i].headcount;
                    let reply = "";

                    while(k<replys.length) {
                        if(_id === replys[k].post_id) {
                            reply += community_template.reply(replys[k].writer_id, replys[k].content);
                        }
                        k++;
                    }
                    
                    // 현재 로그인중인 유저의 아이디로 변경
                    if (writerId == "testuser"){
                        body += community_template.RECRUITMENT_POST_WITH_DELETE_BUTTON(_id, title, people, "", desc, reply);
                    }else{
                        body += community_template.RECRUITMENT_POST(_id, title, people, "", desc, reply);
                    }
                    i++;
                }
                body += `</div>
                <div class="group-reply-popup">
                    <div class="group-reply-popup-wrap">
                        <div class="group-question">
                            <p><span class="group-invitaion-name">redvelvet</span> 님을 그룹으로 초대하시겠습니까?</p>
                        </div>
                        <div class="group-invitation-btn">
                            <p>초대</p>
                        </div>
                    </div>
                </div>`;

                response.send(template.HTML(template.loginNav(false), title, body))
            });
        });
    });      
});

app.post('/delete_recruitment_post', function(req, res){
    var body = '';
    req.on('data', function(data){
        body += data;
    });

    req.on('end', function(){
        var post = qs.parse(body);
        var postId = parseInt(post.post_id);

        // recruitment_post 테이블에 insert하기
        db.query(`DELETE FROM recruitment_post WHERE post_id = ${postId}`, 
            function(error, topics){
            if(error){
                throw error;
            }

            console.log("그룹원 모집글("+postId+")삭제 완료");

            res.writeHead(302, {Location: '/community'});
            res.end();
        });
    });
});


app.get('/create_group', function(req, res){
    var title = '그룹 생성';
    var body = 
            `<input type="button" value="그룹원 모집글 작성" onclick="location.href='/create_group/create_recruitment_post'">`;

    var html = template.HTML(template.loginNav(false), title, body);
    res.send(html);
});

app.get('/create_group/create_recruitment_post', function(req, res){
    var title = '그룹원 모집글 생성';

    // 그룹아이디 받기
    // var groupId = ;

    var body = `<h2 id="title">그룹원 모집글 작성</h2>
                <form action="/create_recruitment_post_process" method="post">
                    <input type="hidden" name="groupId" value="1234">

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
    var html = template.HTML(template.loginNav(false), title, body);
    res.send(html);
});

app.post('/create_recruitment_post_process', function(req, res){
    var body = '';
    req.on('data', function(data){
        body += data;
    });

    req.on('end', function(){
        var post = qs.parse(body);
        var groupId = parseInt(post.groupId);
        var writerId = "testuser" // 현재 로그인중인 유저의 아이디로 변경
        var title = post.title;
        var content = post.content;

        // recruitment_post 테이블에 insert하기
        db.query(`INSERT INTO recruitment_post (group_id, writer_id, title, content, reg_date) VALUES(?, ?, ?, ?, NOW())`, 
            [groupId, writerId, title, content], function(error, topics){
            if(error){
                throw error;
            }

            console.log("그룹("+groupId+")의 그룹원 모집글 등록 완료");

            res.writeHead(302, {Location: '/community'});
            res.end();
        });
    });
});

app.get('/signin', function(req, res){
    var title = '로그인';
    var body = '<p>로그인 페이지</p>';

    var html = template.HTML(template.loginNav(false), title, body);
    res.send(html);
});

app.get('/signup', function(req, res){
    var title = '회원가입';
    var body = '<p>회원가입 페이지</p>';

    var html = template.HTML(template.loginNav(false), title, body);
    res.send(html);
});

app.listen(3000, () => console.log('실행중'));