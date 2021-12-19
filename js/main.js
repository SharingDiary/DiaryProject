const express = require('express');
const app = express();
const template = require('./lib/template.js');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

let groupCreateRouter = require('./routes/create_group');
let groupUpdateRouter = require('./routes/update_group');
let groupDeleteRouter = require('./routes/delete_group');
let searchIdRouter = require('./routes/searchId');
let groupRouter = require('./routes/group');
let communityRouter = require('./routes/community');
let signUpRouter = require('./routes/sign_up');
let signInRouter = require('./routes/sign_in');
let myPageRouter = require('./routes/myPage');
let diaryCreateRouter = require('./routes/create_diary');
let newDiaryRouter = require('./routes/new');
let logoutRouter = require('./routes/logout');

app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

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

app.use('/group', groupRouter); // group으로 시작하는 주소는 내 그룹 화면
app.use('/create_group', groupCreateRouter); // create_group으로 시작하는 주소는 그룹 생성과 관련 
app.use('/update_group', groupUpdateRouter); // update_group으로 시작하는 주소는 그룹 수정과 관련
app.use('/delete_group', groupDeleteRouter); //delete_group으로 시작하는 주소는 그룹 삭제와 관련
app.use('/community', communityRouter); //community로 시작하는 주소는 커뮤니티 관련 
app.use('/searchId', searchIdRouter); //searchId로 시작하는 주소는 아이디 찾기 
app.use('/signup', signUpRouter); //signup로 시작하는 주소는 회원가입
app.use('/signin', signInRouter); //signin로 시작하는 주소는 로그인
app.use('/mypage', myPageRouter); //myPage로 시작하는 주소는 마이페이지
app.use('/create_diary', diaryCreateRouter); //create diary 작성
app.use('/new', newDiaryRouter); //create diary 작성
app.use('/logout', logoutRouter);

app.get('/', function(req, res){
    let title = '메인페이지';
    let body = '<p>셰리 서비스 소개</p>';
    console.log("main: ", req.user);

    let html = template.HTML(template.loginNav(false), title, body);
    res.send(html);
});


app.use(function(req, res, next) {
    res.status(404).send('Not Found');
});

app.listen(3000, () => console.log('실행중'));