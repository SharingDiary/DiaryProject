const mysql = require('mysql');
const express = require('express');
const app = express();
const template = require('./lib/comm_template.js');
const style_list = require('./lib/comm_style_list.js');
const bodyParser = require('body-parser');
const router = express.Router();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'slee',
    password: 'password!',
    // password: 'Pi603-zza14!',
    database: 'slee'
});
db.connect();

let alert_script = "";

router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(request, response) {
    return response.send('hello page')
});

router.get('/community', function(request, response) {
    let writing_list = "";
    db.query(`SELECT * FROM recruitment_post`, function(error, posts) {
        if (error) throw error;
        db.query(`SELECT * FROM recruitment_post LEFT JOIN slee.group ON recruitment_post.group_id = group.group_id`, function(error2, groups) {
            db.query(`SELECT * FROM group_member LEFT JOIN slee.member ON group_member.member_id = slee.member.member_id`, function(error3, group_members) {
                db.query(`SELECT * FROM recruitment_post_reply LEFT JOIN slee.member ON recruitment_post_reply.writer_id = slee.member.member_id`, function(error4, replys) {
                    let i = 0;
                    while(i<posts.length) {
                        let k = 0;
                        let j = 0;
                        let _id = posts[i].post_id;
                        let title = posts[i].title;
                        let desc = posts[i].content;
                        let people = groups[i].headcount;
                        let now_people = 0;
                        let reply = "";
                        let group_master = "";
                        while (j<group_members.length) {
                            if(groups[i].group_id === group_members[j].group_id) {
                                now_people++;
                                if(group_members[j].is_leader == 1) {  
                                    group_master = group_members[j].nickname;
                                }
                            }
                            j++;
                        }
                        while(k<replys.length) {
                            if(_id === replys[k].post_id) {
                                reply = reply + template.reply(replys[k].nickname, replys[k].content, replys[k].reply_id, replys[k].post_id, replys[k].writer_id);
                            }
                            k++;
                        }
                        
                        writing_list = writing_list + template.writing(_id, title, now_people, people, group_master, desc, reply);
                        i++;
                    }
                    response.send(template.HTML(style_list.nav, style_list.community, template.custom_script(alert_script), writing_list))
                    alert_script = "";
                });
            });
        })
    })      
});

router.post('/reply_process', function(request, response) {

    let post = request.body;
    console.log(post.reply);
    db.query(`SELECT * FROM recruitment_post_reply`, function(error2, replys) {
        if (post.reply === '') {
            console.log('댓글이 비어있습니다.');
            alert_script = "<script>alert('댓글이 비어있습니다.')</script>"
        } else {
            alert_script = "";
            db.query(`INSERT INTO recruitment_post_reply (post_id, writer_id, content, reg_date)
            VALUES(?, ?, ?, NOW())`, [post.post_id, "id1212", post.reply], function(error, result) {
                if (error) throw error;
                
            });  
        }
        return response.redirect('/community');
    });
});

router.post('/reply_invite_process', function(request, response) {
    let post = request.body;
    let this_reply_id = post.reply_id;
    let this_post_id = post.post_id;
    let this_writer_id = post.writer_id;
    console.log("reply_id: ", this_reply_id);
    db.query(`SELECT * FROM recruitment_post_reply`, function(error2, replys) {
        db.query(`SELECT * FROM recruitment_post LEFT JOIN slee.group ON recruitment_post.group_id = group.group_id`, function(error, posts) {
            db.query(`SELECT * FROM group_member`, function(error3, group_members) {
                let k = 0;
                let this_group_id = 0;
                let this_group_headcount = 0;
                let this_group_leader = "";
                let this_user = "mfirst";
                let i = 0;
                let is_here = false;
                let now_headcount = 0;
                while(k<posts.length) {
                    if (posts[k].post_id == this_post_id) {
                        this_group_id = posts[k].group_id;
                        this_group_headcount = posts[k].headcount;
                    }
                    k++;
                }
                console.log("headcount: ", this_group_headcount);
                while(i<group_members.length) {
                    if(group_members[i].group_id == this_group_id) {
                        now_headcount++;
                        if (group_members[i].member_id == this_writer_id) {
                            is_here = true;
                        }
                        if (group_members[i].is_leader == 1) {
                            this_group_leader = group_members[i].member_id;
                        }
                    }
                    i++;
                }
                
                console.log("now: ",now_headcount);
                console.log("leader: ", this_group_leader);
                if(this_group_leader == this_user) {
                    if(is_here){
                        alert_script = "<script>alert('이미 그룹에 가입된 멤버입니다.')</script>"
                    } else {
                        if(now_headcount >= this_group_headcount) {
                            alert_script = "<script>alert('인원 모집이 끝난 그룹입니다.')</script>"
                        } else {
                            alert_script = "";
                            db.query(`INSERT INTO group_member (group_id, member_id, is_leader)
                            VALUES(?, ?, ?)`, [this_group_id, this_writer_id, 0], function(error, result) {
                                if (error) throw error;
                            });  
                        }
                    }
                } else {
                    alert_script="<script>alert('초대 권한이 없습니다.')</script>"
                }
                
                return response.redirect('/community');
            });
        });
    });
});

// app.use(function(request, response, next) {
//     response.status(404).send('Sorry cant find it.')
// })
// app.listen(3000, function() {
//     console.log('port 3000')
// });
module.exports = router;