let express = require('express') //使用express
let router = express.Router() //放数据

/* GET home page. */
const mysql = require('mysql')

const bcrypt = require('bcrypt')

const jwt = require("jsonwebtoken")
const keys = 'secret'
const passport = require('passport')
const db = mysql.createConnection({
    host: 'localhost',
    database: 'hang', // 使用哪个数据库
    user: 'root', //用户名
    password: 'Tu1995', //密码
    port: 3306, // 端口号，MySQL默认3306
    multipleStatements: true //是否开启混合语句查询
})

//注册
router.post('/register', (req, res) => {
    let obj = {
        msg: '',
        status: ''
    }
    var flag = true // true表示用户名可用 false 表示用户名重复了不能使用

    // 判断用户名是否重复
    db.query('select * from user', (err, data) => {
        //data是从数据库查到的参数
        if (data.length != 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].userName == req.body.userName) {
                    obj.msg = '用户邮箱重复,不能使用'
                    obj.status = 1
                    flag = false
                    res.send(obj)
                    return
                }
            }
        }
        if (flag) {
            var addSql =
                'INSERT INTO user(userName,password,email,time,identity) VALUES(?,?,?,?,?)'

            //使用加密
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    // Store hash in your password DB.
                    if (err) throw err
                    let addSqlParams = [
                        req.body.userName,
                        hash,
                        req.body.email,
                        new Date(),
                        req.body.identity,
                    ]
                    db.query(addSql, addSqlParams, (err, rows) => {
                        if (err) {
                            console.log(err.message)
                            obj.status = 0
                            obj.msg = '注册失败'
                            return
                        }
                        obj.status = 1
                        obj.msg = '注册成功'
                        res.send(obj)
                    })
                })
            })
        }
    })
})

//登陆
//返回 token  jwt possword
router.post('/login', (req, res) => {
    const userName = req.body.userName
    const password = req.body.password
    let obj = {
            msg: '',
            status: '',
            token: ''
        }
        // console.log(req.body.userName)
        //查询数据库
    db.query('select * from user', (err, data) => {
        //data是从数据库查到的参数  如果当前输入值等于查到的值 return改值

        let arr = data.filter((item) => {
            return item.userName == userName
        });
        //sql查询会返回RowDataPacket  所以需要arr[0]去获取值
        if (arr.length == 0) {
            obj.status = 1
            obj.msg = '用户名不存在'
            res.send(obj)
            return
        }
        if (arr[0].userName == userName) {
            bcrypt.compare(password, arr[0].password).then(isMatch => {
                //如果密码正确
                if (isMatch) {
                    const rule = {
                            id: arr[0].id,
                            name: arr[0].userName,
                            identity: arr[0].identity
                        }
                        //规则, 加密名字, 过期时间, 箭头函数
                    jwt.sign(rule, keys, {
                        expiresIn: 3600
                    }, (err, token) => {
                        if (err) throw err
                        obj.msg = '登陆成功'
                        obj.token = 'Bearer ' + token
                        obj.status = 0
                        res.send(obj)
                    })

                } else {
                    obj.msg = '密码错误'
                    obj.status = 1
                    res.send(obj)
                }
            }).catch(error => {
                console.log('caught', error)
            })
        } else {
            //当前用户名不存在
            console.log(2)
            obj.status = 1
            obj.msg = '用户名不存在'
            res.send(obj)
        }

    })
})

//获取表下的所有内容
router.get('/all', (req, res) => {
    db.query('select * from study', (err, data) => {
        if (err) {
            throw err
        }
        res.end(
            res.json({
                status: 0,
                msg: '请求成功',
                result: {
                    count: data.length,
                    data: data
                }
            })
        )
    })
})

//验证token  是否正确
router.get("/current", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log(req.user[0])
    res.json({
        id: req.user[0].id,
        name: req.user[0].userName,
        email: req.user[0].email,
        identity: req.user[0].identity
    })
})

//添加
router.post('/add', (req, res) => {
    let obj = {
        msg: '',
        status: ''
    }
    var flag = true // true表示用户名可用 false 表示用户名重复了不能使用

    // 判断用户名是否重复
    db.query('select * from study', (err, data) => {
        //data是从数据库查到的参数
        for (var i = 0; i < data.length; i++) {
            if (data[i].activityName == req.body.activityName) {
                obj.msg = '用户名重复，不能使用'
                obj.status = 1
                flag = false
                res.send(obj)
                return
            }
        }
        if (flag) {
            //sql语句
            var addSql =
                'INSERT INTO study(activityName,activityArea,time,resources,content,activityPurpose) VALUES(?,?,?,?,?,?)'
            var addSqlParams = [
                req.body.activityName,
                req.body.activityArea,
                req.body.time,
                req.body.resources,
                req.body.content,
                req.body.activityPurpose
            ]
            db.query(addSql, addSqlParams, (err, rows) => {
                if (err) {
                    throw err
                }
                obj.msg = '添加成功'
                obj.status = 0
                res.send(obj)
            })
        }
    })
})

//查询
router.get('/search', (req, res) => {
    var value = req.query.val

    db.query(
        `SELECT * FROM study where activityName like '%${value}%' and activityArea like '%${value}%'`,
        (qerr, data, fields) => {
            res.end(
                res.json({
                    status: 0,
                    msg: '请求成功',
                    result: {
                        count: data.length,
                        data: data
                    }
                })
            )
        }
    )
})





module.exports = router