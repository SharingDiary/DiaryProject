const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const mysql = require('mysql');
const express = require('express');
const app = express();
const template = require('./lib/comm_template.js');
const style_list = require('./lib/comm_style_list.js');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'slee',
    password: 'Pi603-zza14!',
    database: 'slee'
});
db.connect();

app.get('/', function(request, response) {
    return response.send('hello page')
});

app.get('/community', function(request, response) {
    let writing_list = "";
    db.query(`SELECT * FROM recruitment_post`, function(error, posts) {
        if (error) throw error;
        db.query(`SELECT * FROM recruitment_post LEFT JOIN slee.group ON recruitment_post.group_id = group.group_id`, function(error2, groups) {
            db.query(`SELECT * FROM recruitment_post_reply`, function(error2, replys) {
                let i = 0;
                // console.log(replys)
                while(i<posts.length) {
                    let k = 0;
                    let _id = posts[i].post_id;
                    let title = posts[i].title;
                    let desc = posts[i].content;
                    let people = groups[i].headcount;
                    let reply = "";

                    while(k<replys.length) {
                        if(_id === replys[k].post_id) {
                            reply = reply + template.reply(replys[k].writer_id, replys[k].content);
                        }
                        k++;
                    }
                    
                    writing_list = writing_list + template.writing(_id, title, people, "", desc, reply);
                    i++;
                }
                response.send(template.HTML(style_list.nav, style_list.community, template.custom_script, writing_list))
            });
            
        })
    })      
});

app.post('/reply_process', function(request, response) {
    var body='';
    request.on('data', function(data) {
        body = body + data;
    });

    request.on('end', function() {
        var post = qs.parse(body);
        console.log(post.reply);
        db.query(`SELECT * FROM recruitment_post_reply`, function(error2, replys) {
            if (post.reply === '') {
                console.log('댓글이 비어있습니다.');
            } else {
                db.query(`INSERT INTO recruitment_post_reply (post_id, writer_id, content, reg_date)
                VALUES(?, ?, ?, NOW())`, [post.post_id, "cancan", post.reply], function(error, result) {
                    if (error) throw error;
                    return response.redirect('/community');
                });  
            }
        });
    });
});

app.listen(3000, function() {
    console.log('port 3000')
});