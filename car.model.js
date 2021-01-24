var mongoose = require('mongoose')
const carSchema = new mongoose.Schema({
 audit_name: String,
 report_date: String,
 department: String,
 responsible_person: String,
 statement: String,
 root_cause: String,
 action_plan: String,
 due_date: String
})
var CAR = mongoose.model('CAR', carSchema)
module.exports = CAR