const mysql = require("mysql")

//Schema是数据库对象的集合
const Schema = mysql.schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    emil: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports.User = mysql.model('users', userSchema)