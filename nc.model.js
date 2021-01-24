var mongoose = require('mongoose')
const ncSchema = new mongoose.Schema({
 audit_name: String,
 audit_date: String,
 report_date: String,
 department: String,
 auditor_name: String,
 area: String,
 res_person: String,
 type: String,
 statement: String
})
var NC = mongoose.model('NC', ncSchema)
module.exports = NC