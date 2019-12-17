let express = require('express'); //使用express
let router = express.Router(); //放数据
/* GET home page. */
const mysql = require("mysql")
const db = mysql.createConnection({
    host: "localhost",
    database: 'hang', // 使用哪个数据库
    user: "root", //用户名
    password: "Tu1995", //密码
    port: 3306 // 端口号，MySQL默认3306
});
//获取表下的所有内容
router.get('/all', (req, res) => {
    db.query('select * from map_data', (err, data) => {
        if (err) {
            throw err
        }
        res.end(res.json({
            status: 0,
            msg: "请求成功",
            result: {
                count: data.length,
                data: data
            }
        }))
    })
});


module.exports = router;