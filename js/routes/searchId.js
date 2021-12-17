let express = require('express');
let app = express();
let router = express.Router();
let fs = require('fs');
let db = require('../lib/db');
let template = require('../lib/template');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    let html = template.searchIdHTML(req.baseUrl, '');
    res.send(html);
});

router.post('/process', (req, res) => {
    let memberId = req.body.memberId;
    let body = '';
    db.query(`SELECT * FROM member`, function(err, results) {
        if(err) throw err;
        for(let i = 0; i < results.length; i++) {
            if(memberId === results[i].member_id) {
                body = '아이디가 존재합니다.';
                break;
            }
            else 
                body = '아이디가 존재하지 않습니다.';
        }
        let html = template.searchIdHTML(req.baseUrl, body);
        res.send(html);
    });
    
});

router.use(function(req, res, next) {
    res.status(404).send('Not Found');
});

module.exports = router;