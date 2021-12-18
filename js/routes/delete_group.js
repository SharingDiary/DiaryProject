let express = require('express');
let app = express();
let router = express.Router();
let db = require('../lib/db');
let template = require('../lib/template');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/', (req, res) => {
    let groupId = req.body.groupId;
    db.query(`DELETE FROM diaryProject.group WHERE group_id=?`, [groupId], function(err, result) {
        if (err) throw err;
        res.redirect('/group');
    });
});

router.use(function(req, res, next) {
    res.status(404).send('Not Found');
});

module.exports = router;