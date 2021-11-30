var express = require('express');
var app = express();
var fs = require('fs');
var template = require('./lib/template.js');
var path = require('path');
var qs = require('querystring');
let db = require('./lib/db.js');
const bodyParser = require('body-parser');
let groupCreateRouter = require('../routes/create_group');
let groupRouter = require('../routes/group');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/create_group', groupCreateRouter); // create_group으로 시작하는 주소는 그룹 생성과 관련 
app.use('/group', groupRouter); // group으로 시작하는 주소는 내 그룹 화면


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

// app.get('/group', function(req, res){
//     var title = '내그룹';
//     var body = '<p>그룹 보기</p>';

//     var html = template.HTML(template.loginNav(false), title, body);
//     res.send(html);
// });

app.get('/community', function(req, res){
    var title = '커뮤니티';
    var body = '<p>그룹원 모집글 보기</p>';

    var html = template.HTML(template.loginNav(false), title, body);
    res.send(html);
});

// app.get('/create_group', function(req, res){
//     var title = '그룹 생성';
//     var body = 
//             `<input type="button" value="그룹원 모집글 작성" onclick="location.href='/create_group/create_recruitment_post'">`;

//     var html = template.HTML(template.loginNav(false), title, body);
//     res.send(html);
// });

// app.get('/create_group/create_recruitment_post', function(req, res){
//     var title = '그룹원 모집글 생성';
//     var body = `<h2 id="title">그룹원 모집글 작성</h2>
//                 <form action="/create_recruitment_post_process" method="post">
//                     <input type="hidden" name="groupId" value="1234">

//                     <div id="input_title">
//                         <h3>제목</h3>
//                         <input type="text" name="title" placeholder="제목을 입력해주세요.">
//                     </div>

//                     <div id="input_content">
//                         <h3>내용</h3>
//                         <textarea name="content" placeholder="내용을 입력해주세요."></textarea>
//                     </div>

//                     <div id="submit_div">
//                         <input type="submit" value="완료">
//                     </div>
                    
//                 </form>`;
//     var html = template.HTML(template.loginNav(false), title, body);
//     res.send(html);
// });

// app.post('/create_recruitment_post_process', function(req, res){
//     var body = '';
//     req.on('data', function(data){
//         body += data;
//     });

//     req.on('end', function(){
//         var post = qs.parse(body);
//         var groupId = parseInt(post.groupId);
//         var title = post.title;
//         var content = post.content;

//         // recruitment_post 테이블에 insert하기
//         db.query(`INSERT INTO recruitment_post (group_id, title, content, reg_date) VALUES(?, ?, ?, NOW())`, 
//             [groupId, title, content], function(error, topics){
//             if(error){
//                 throw error;
//             }

//             console.log("그룹("+groupId+")의 그룹원 모집글 등록 완료");

//             res.writeHead(302, {Location: '/community'});
//             res.end();
//         });
//     });
// });

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

app.use(function(req, res, next) {
    res.status(404).send('Not Found');
});

app.listen(3000, () => console.log('실행중'));