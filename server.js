var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var server = http.Server(app)

var LoginDoc = require('./login.model')
var AuditDoc = require('./audit.model')
var NCDoc = require('./nc.model')
var CARDoc = require('./car.model')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var dbURL = 'mongodb+srv://mongodb:passwordmongodb@cluster0.hypug.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', function(err) {
    console.log(err)
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html')
})

app.get('/login', function(request, response) {
    response.sendFile(__dirname + '/loginPage.html')
})

app.get('/adminHomePage', function(request, response) {
    response.sendFile(__dirname + '/adminHomePage.html')
})


app.get('/auditeeHomePage', function(request, response) {
    //response.sendFile(__dirname+'/auditeeHomePage.html')
    NCDoc.find({}, function(err, data) {
        response.render('auditeeHomePage.ejs', {
            allNcs: data
        })
    })
})
app.get('/fixPassword', function(request, response) {
    response.sendFile(__dirname + '/fixPassword.html')
})

app.get('/addUser', function(request, response) {
    response.sendFile(__dirname + '/addUser.html')
})
app.get('/addAuditPlan', function(request, response) {
    response.sendFile(__dirname + '/addAuditPlan.html')
})

app.post('/addNerUser', function(request, response) {
    console.log('Add User Post Request Made')
        //console.log(request.body)
        //response.json(request.body)
    var newUser = new LoginDoc(request.body)
    newUser.save(function(err, data) {
        if (err) {
            return response.status(400).json({
                error: 'Kuch toh garbar hai!!!'
            })
        } else {
            return response.status(200).json({
                    message: 'User Added successfully'
                })
                //return response.json(request.body)
        }

    })
})

app.post('/loadHomePage', function(request, response) {


    var User = new LoginDoc(request.body)
    console.log(User)

    LoginDoc.findOne({ $and: [{ name: User.name }, { password: User.password }, { email: User.email }, { type: User.type }] }, function(err, user) {

            if (user == null) {
                //console.log("error")
                //console.log(user)
                return response.status(400).json({
                    error: 'Kuch toh garbar hai!!!'
                })
            } else {
                //console.log("success")
                // console.log(user)
                return response.status(200).json({
                    message: user.type
                })
            }
        })
        //response.sendFile(__dirname+'/addUser.html')
})


app.post('/fixPassword', function(request, response) {


    var change = new LoginDoc(request.body)
    console.log(change)
    LoginDoc.findOne({ email: change.email }, function(err, user) {
        // Update user object
        user.password = change.password
        user.save();

    })
    return response.status(200).json({
        message: "Password Changed Successfully"

        //response.sendFile(__dirname+'/addUser.html')
    })
})


app.post('/removeUser', function(request, response) {
    var emaily = new LoginDoc(request.body)
    console.log(emaily)
    LoginDoc.deleteOne({ email: emaily.email }, function(err) {
        if (!err) {
            return response.status(200).json({
                message: "User Removed Successfully"
            })
        }
    })

})




app.post('/addNewNC', function(request, response) {
    console.log('Add NC Post Request Made')
        //console.log(request.body)
        //response.json(request.body)
    var newNC = new NCDoc(request.body)
    console.log(newNC)
    newNC.save(function(err, data) {
        if (err) {
            return response.status(400).json({
                error: 'Kuch toh garbar hai!!!'
            })
        } else {
            return response.status(200).json({
                    message: 'NC Added successfully'
                })
                //return response.json(request.body)
        }

    })
})



/////////////
app.post('/addNewCAR', function(request, response) {
    console.log('Add CAR Post Request Made')
        //console.log(request.body)
        //response.json(request.body)
    var newCAR = new CARDoc(request.body)
    console.log(newCAR)
    newCAR.save(function(err, data) {
        if (err) {
            return response.status(400).json({
                error: 'Kuch toh garbar hai!!!'
            })
        } else {
            return response.status(200).json({
                    message: 'CAR Added successfully'
                })
                //return response.json(request.body)
        }

    })
})

app.post('/checkCAR', function(request, response) {


    var newCAR = new CARDoc(request.body)
    console.log(newCAR)

    CARDoc.findOne({ $and: [{ audit_name: newCAR.audit_name }, { report_date: newCAR.report_date }, { department: newCAR.department }, { responsible_person: newCAR.responsible_person }] }, function(err, user) {

            if (user == null) {
                //console.log("error")
                //console.log(user)
                return response.status(400).json({
                    error: 'Kuch toh garbar hai!!!'
                })
            } else {
                //console.log("success")
                // console.log(user)
                return response.status(200).json({
                    message: "CAR already Exists for this NC"
                })
            }
        })
        //response.sendFile(__dirname+'/addUser.html')
})

////////////

//Auditor home page All Audits
app.get('/auditorHomePage', function(request, response) {
    //response.sendFile(__dirname+'/auditorHomePage.html')

    AuditDoc.find({}, function(err, data) {

        response.render('auditorHomePage.ejs', {
                allAudits: data
            })
            //console.log(data)
    })
})

app.post('/checkNC', function(request, response) {


    var newNC = new NCDoc(request.body)
    console.log(newNC)

    NCDoc.findOne({ $and: [{ audit_name: newNC.audit_name }, { audit_date: newNC.audit_date }, { department: newNC.department }, { auditor_name: newNC.auditor_name }] }, function(err, user) {

            if (user == null) {
                //console.log("error")
                //console.log(user)
                return response.status(400).json({
                    error: 'Kuch toh garbar hai!!!'
                })
            } else {
                //console.log("success")
                // console.log(user)
                return response.status(200).json({
                    message: "NC already Exists for this Audit"
                })
            }
        })
        //response.sendFile(__dirname+'/addUser.html')
})

//add new audit plan
app.post('/addNerAudit', function(request, response) {
    console.log('Add Adit Post Request Made')
        //console.log(request.body)
        //response.json(request.body)
    var newAudit = new AuditDoc(request.body)
    console.log(newAudit)
    newAudit.save(function(err, data) {
        if (err) {
            return response.status(400).json({
                error: 'Kuch toh garbar hai!!!'
            })
        } else {
            return response.status(200).json({
                    message: 'Audit Added successfully'
                })
                //return response.json(request.body)
        }

    })
})


//view CAR
app.get('/viewCar', function(request, response) {

    CARDoc.find({}, function(err, data) {
        response.render('viewCar.ejs', {
            allCAR: data
        })
    })

})


// THE server routes go here
app.use(express.static('public'))

server.listen(process.env.PORT || 3000,
    process.env.IP || 'localhost',
    function() {
        console.log('Server is walking!');
    })
module.exports = { app, server, mongoose }