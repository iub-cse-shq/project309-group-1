var mongoose = require('mongoose')
const auditSchema = new mongoose.Schema({
 name: String,
 date: String,
 department: String,
 person: String,
 area: String
})
var Audit = mongoose.model('Audit', auditSchema)
module.exports = Audit