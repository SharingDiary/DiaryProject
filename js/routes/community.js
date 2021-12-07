let db = require('../lib/db');
const express = require('express');
const app = express();
let router = express.Router();
const template = require('../lib/comm_template');
const style_list = require('../lib/comm_style_list');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// router.get('/', function(request, response) {
//     return response.send('hello page')
// });

router.get('/', function(request, response) {
    let writing_list = "";
    db.query(`SELECT * FROM recruitment_post`, function(error, posts) {
        if (error) throw error;
        db.query(`SELECT * FROM recruitment_post LEFT JOIN diaryProject.group AS g 
        ON recruitment_post.group_id = g.group_id`, function(error2, groups) {
            db.query(`SELECT * FROM recruitment_post_reply`, function(error2, replys) {
                let i = 0;
                // console.log(replys)
                while(i < groups.length) {
                    let k = 0;
                    let _id = groups[i].post_id;
                    let title = groups[i].title;
                    let desc = groups[i].content;
                    let master = groups[i].name;
                    let people = groups[i].headcount;
                    let reply = "";

                    while(k < replys.length) {
                        if(_id === replys[k].post_id) {
                            reply = reply + template.reply(replys[k].writer_id, replys[k].content);
                        }
                        k++;
                    }
                    
                    writing_list = writing_list + template.writing(_id, title, people, master, desc, reply);
                    i++;
                }
                response.send(template.HTML(style_list.nav, style_list.community, template.custom_script, writing_list))
            });
            
        })
    })      
});

router.post('/reply_process', function(request, response) {
    let post = request.body;
    let userId = 'kim'
    console.log(post.reply);
    db.query(`SELECT * FROM recruitment_post_reply`, function(error2, replys) {
        if (post.reply === '') {
            console.log('댓글이 비어있습니다.');
        } else {
            db.query(`INSERT INTO recruitment_post_reply (post_id, writer_id, content, reg_date)
            VALUES(?, ?, ?, NOW())`, [post.post_id, userId, post.reply], function(error, result) {
                if (error) throw error;
                response.redirect(`${request.baseUrl}`);
            });  
        }
    });
});

router.use(function(req, res, next) {
    res.status(404).send('Not Found');
});

module.exports = router;