let express = require('express');
let app = express();
let router = express.Router();
let fs = require('fs');
let db = require('../lib/db');
let template = require('../lib/template');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    db.query(`SELECT * FROM diaryProject.group AS g LEFT JOIN group_member AS gm
        ON g.group_id = gm.group_id WHERE gm.member_id=?`, ['yih'], function(err, group) {
            if(err) throw err;
            
            db.query(`SELECT group_id, count(member_id) AS currentHeadcount 
            FROM group_member AS gm GROUP BY group_id`, function(err2, count) {
                if(err2) throw err2;
                let groupList = template.groupList(group, count, req.baseUrl);
                let title = "내 그룹";
                let body = `
                <div id="title_div">
                    <div class="title_div_left">
                        <h2>내 그룹</h2>
                        <button onclick="location.href='/update_group';">🖊️</button>
                    </div>
                </div>
                <div id="groups_div">
                    ${groupList}
                </div>
                `;
                let html = template.groupHTML(template.loginNav(false), title, body);
                res.send(html);
            });
    });
});

router.get('/myGroup/:groupId', (req, res) => {
    fs.readFile(__dirname + '/../../html/myGroup.html', 'utf8', function (err, data) { 
        if (err) {
          throw err; 
        }
        res.send(data);
    });
});

module.exports = router;