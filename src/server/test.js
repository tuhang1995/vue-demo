let express = require('express') //使用express
let router = express.Router() //放数据

/* GET home page. */
const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    database: 'hang', // 使用哪个数据库
    user: 'root', //用户名
    password: 'Tu1995', //密码
    port: 3306, // 端口号，MySQL默认3306
    multipleStatements: true //是否开启混合语句查询
})

router.get('/testAll', (req, res) => {
    //currentPage 当前第几页 pageSize 一页多少条
    let start = (req.query.currentPage - 1) * req.query.pageSize;

    //SELECT COUNT(*) FROM test  查询该数据库字段的总长度
    db.query(`SELECT COUNT(*) FROM test;select * from test limit ${start},${req.query.pageSize} `, (err, data) => {
        if (err) {
            throw err
        }
        let allCount = data[0][0]['COUNT(*)']
        let allPage = allCount / req.query.pageSize
        let pageStr = allPage.toString()

        //不能被整除
        if (pageStr.indexOf("." > 0)) {
            allPage = parseInt(pageStr.split('.')[0]) + 1
        }
        let list = data[1]
        res.end(
            //计算总页数
            res.json({
                status: 0,
                msg: '请求成功',
                result: {
                    data: list,
                    totalPage: allPage, //一共多少页
                    count: allCount, //总长度
                    currentPage: req.query.currentPage, //当前第几页

                }
            })
        )
    })
})

module.exports = router