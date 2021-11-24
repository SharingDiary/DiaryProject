var express = require('express');
var app = express();
var fs = require('fs');
var template = require('./lib/template.js');
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

app.get('/community', function(req, res){
    var title = '커뮤니티';
    var body = '<p>그룹원 모집글 목록 보기</p>';

    var html = template.HTML(template.loginNav(false), title, body);
    res.send(html);
});

app.get('/recruitment_post/:postId', function(req, res){
    var title = '그룹원 모집글 조회';
    var postId = parseInt(path.parse(req.params.postId).base);

    db.query(`SELECT * FROM recruitment_post WHERE post_id=${postId}`, 
        function(error, topics){
            if(error){
                throw error;
            }

            console.log("그룹원 모집글("+postId+") 조회 완료");
            console.log(topics);

            var body = `<h2 id="title">그룹원 모집글</h2>
                    <div id="input_title">
                        <h3>제목</h3>
                        <input type="text" name="title" value="${topics[0].title}" readonly>
                    </div>

                    <div id="input_content">
                        <h3>내용</h3>
                        <textarea name="content" readonly>${topics[0].content}</textarea>
                    </div>`;

            var html = template.HTML(template.loginNav(false), title, body);
            res.send(html);
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
        var title = post.title;
        var content = post.content;

        // recruitment_post 테이블에 insert하기
        db.query(`INSERT INTO recruitment_post (group_id, title, content, reg_date) VALUES(?, ?, ?, NOW())`, 
            [groupId, title, content], function(error, topics){
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