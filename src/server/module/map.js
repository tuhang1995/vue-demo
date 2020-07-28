let express = require('express') //使用express
let router = express.Router() //放数据
/* GET home page. */
const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  database: 'hang', // 使用哪个数据库
  user: 'root', //用户名
  password: '19950929', //密码
  port: 3306, // 端口号，MySQL默认3306
})
const jwt = require('jsonwebtoken')
const secret = require('../public/base')
//获取表下的所有内容
router.get('/all', (req, res) => {
  db.query('select * from map_data', (err, data) => {
    if (err) {
      throw err
    }
    let token = req.headers.token // 从headers中获取token
    jwt.verify(token, secret.keys, (error, decoded) => {
      if (error) {
        res.json({
          msg: 'token失效',
          status: 0,
        })
        return
      }
      res.end(
        res.json({
          status: 0,
          msg: '请求成功',
          result: {
            count: data.length,
            data: data,
          },
        })
      )
      // console.log(decoded)
    })
  })
})

module.exports = router
