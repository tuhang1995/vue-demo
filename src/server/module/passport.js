const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt
const mysql = require('mysql')
const opts = {}

const db = mysql.createConnection({
  host: 'localhost',
  database: 'hang', // 使用哪个数据库
  user: 'root', //用户名
  password: '19950929', //密码
  port: 3306, // 端口号，MySQL默认3306
  multipleStatements: true, //是否开启混合语句查询
})

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret'
module.exports = (passport) => {
  //处理passport
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      console.log(jwt_payload)
      db.query(
        `SELECT * FROM user where id like '%${jwt_payload.id}%'`,
        (err, data) => {
          if (data) {
            return done(null, data)
          }
          return done(null, false)
        }
      )
    })
  )
}
