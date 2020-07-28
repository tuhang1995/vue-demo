const express = require('express')
const app = express()
const mysql = require('mysql')

var bodyParser = require('body-parser')

const passport = require('passport')

//创建连接
const db = mysql.createConnection({
  host: 'localhost',
  database: 'hang', // 使用哪个数据库
  user: 'root', //用户名
  password: '19950929', //密码
  port: 3306, // 端口号，MySQL默认3306
})

db.connect((err) => {
  if (err) throw err
  console.log('连接成功')
})

app.listen(3000, () => {
  console.log('服务器开启在3000端口')
})

//设置跨域
app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  //允许的header类型
  res.header(
    'Access-Control-Allow-Headers',
    'content-type,application/x-www-form-urlencoded,Access-Token,token'
  )
  //解决请求乱码
  res.setHeader('Content-type', 'application/json')
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() == 'options') res.send(200)
  //让options尝试请求快速结束
  else next()
})

var userRouter = require('./module/user')
let mapRouter = require('./module/map')
let testRouter = require('./module/test')
//post请求 使用body-parser接收req.body参数
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

//passport初始化
app.use(passport.initialize())
require('./module/passport')(passport)
//post请求
app.use(bodyParser.json())

app.all('/', function (req, res) {
  res.send(req.body.title + req.body.text)
})

//使用router
app.use('/test', testRouter)
app.use('/user', userRouter)
app.use('/map', mapRouter)
