var mongoose = require('mongoose')
const loginSchema = new mongoose.Schema({
 name: String,
 email: String,
 password: String,
 type: String
})
var Login = mongoose.model('Login', loginSchema)
module.exports = Login
