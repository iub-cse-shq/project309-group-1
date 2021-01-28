const isValidEmail = (email_string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_string);
}
const loginBtnClicked = () => {
    var name = $('#login_name').val()
    var email = $('#login_email').val()
    var password = $('#login_password').val()
    var type = $('#login_type').val()
        //console.log(email +" "+ password +" "+ type)
    var check = isValidEmail(email);
    if (check == true && name && password && type != "none") {
        //console.log(check);
        //console.log(email +" "+ password +" "+ type)
        var User = {
            name: name,
            email: email,
            password: password,
            type: type
        }
        $.ajax({
                url: '/loadHomePage',
                type: 'POST',
                data: User,
                success: response => {
                    console.log(response)
                        // test = response;
                    alert(response.message)
                    loadPage(response.message)
                },
                error: response => {
                    console.log(response)
                    alert("Wrong Input!! Please Check Again.")
                }

            }

        )
    } else {
        alert('Enter Information in all fields properly')
    }

}

const addUser = () => {
    var name = $('#add_name').val()
    var email = $('#add_email').val()
    var password = $('#add_password').val()
    var type = $('#add_type').val()

    var check = isValidEmail(email);
    if (check == true && name && password && type != "none") {
        //console.log(check);
        //console.log(name +" "+ email +" "+ password +" "+ type)
        var newUser = {
            name: name,
            email: email,
            password: password,
            type: type
        }
        $.ajax({
                url: '/addNerUser',
                type: 'POST',
                data: newUser,
                success: response => {
                    console.log(response)
                        // test = response;
                    alert(response.message)
                },
                error: response => {
                    console.log(response)
                }

            }

        )

        reset_input_fields()
    } else {
        alert('Enter Information in all fields properly')
    }

}

const reset_input_fields = () => {
    $('#add_name').val("")
    $('#add_email').val("")
    $('#add_password').val("")
    $('#add_type').val("")
}

const loadPage = (userType) => {
    console.log("user type: " + userType)
    if (userType == "Auditor") {
        console.log("I am " + userType)
        window.location.href = "/auditorHomePage";
    }
    if (userType == "Auditee") {
        console.log("I am " + userType)
        window.location.href = "/auditeeHomePage";
    }
    if (userType == "Admin") {
        console.log("I am " + userType)
        window.location.href = "/adminHomePage";

    }

}

const changePassword = () => {
    var email = $('#fix_email').val()
    var password = $('#fix_password').val()
    var change = {
        email: email,
        password: password
    }
    $.ajax({
            url: '/fixPassword',
            type: 'POST',
            data: change,
            success: response => {
                console.log(response)
                    // test = response;
                alert(response.message)
            },
            error: response => {
                console.log(response)
            }

        }

    )
}

const removeUser = () => {
    var email = $('#remove_email').val()
    var emaily = { email: email }
    $.ajax({
            url: '/removeUser',
            type: 'POST',
            data: emaily,
            success: response => {
                console.log(response)
                    // test = response;
                alert(response.message)
            },
            error: response => {
                console.log(response)
            }

        }

    )
}




const addNewAudit = () => {
    var auditName = $('#audit_name').val()
    var auditDate = $('#audit_date').val()
    var auditDepartment = $('#audit_department').val()
    var auditPerson = $('#audit_person').val()
    var auditArea = $('#audit_area').val()

    console.log(auditName + " " + auditDate + " " + auditDepartment + " " + auditPerson + " " + auditArea)
    if (auditName && auditDate && auditDepartment && auditPerson && auditArea) {
        var newAudit = {
            name: auditName,
            date: auditDate,
            department: auditDepartment,
            person: auditPerson,
            area: auditArea
        }
        $.ajax({
            url: '/addNerAudit',
            type: 'POST',
            data: newAudit,
            success: response => {
                console.log(response)
                    // test = response;
                alert(response.message)
            },
            error: response => {
                console.log(response)
            }

        })


    } else {
        alert('Enter Information in all fields properly')
    }

}



const ncSubmitClicked = () => {
    var audit_name = $('#nc_name').val()
    var date = $('#nc_date').val()
    var report_date = $('#nc_report_date').val()
    var department = $('#nc_department').val()
    var auditor_name = $('#nc_auditor_name').val()
    var area = $('#nc_area').val()
    var res_person = $('#nc_responsible_person').val()
    var type = $('#nc_seriousness').val()
    var statement = $('#nc_statement').val()
    if (audit_name && date && report_date && department && auditor_name && area && res_person && type && statement) {
        var newNC = {
            audit_name: audit_name,
            audit_date: date,
            report_date: report_date,
            department: department,
            auditor_name: auditor_name,
            area: area,
            res_person: res_person,
            type: type,
            statement: statement
        }

        $.ajax({
            url: '/checkNC',
            type: 'POST',
            data: newNC,
            success: response => {
                console.log(response)
                    // test = response;
                alert(response.message)
            },
            error: response => {
                //console.log(response)
                $.ajax({
                    url: '/addNewNC',
                    type: 'POST',
                    data: newNC,
                    success: response => {
                        console.log(response)
                            // test = response;
                        alert(response.message)
                    },
                    error: response => {
                        console.log(response)
                    }

                })
            }

        })




    } else {
        alert('Enter Information in all fields properly')
    }
}




const ncButtonClicked = (event) => {
    var buttonId = event.target.id;
    var res = buttonId.split("ncBtn", 2);
    var serial = Number(res[1]);

    console.log("serial : " + serial)

    let name = $('#name' + serial).text()
    let date = $('#date' + serial).text()
    let department = $('#department' + serial).text()
    let person = $('#person' + serial).text()
    let area = $('#area' + serial).text()

    console.log("name: " + name + " date: " + date + " department : " + department + " person: " + person + " area : " + area);
    $('#ncFormPart').show()
    $('#nc_name').val(name)
    $('#nc_date').val(date)
    $('#nc_department').val(department)
    $('#nc_auditor_name').val(person)
    $('#nc_area').val(area)


}



const carButtonClicked = (event) => {
    var buttonId = event.target.id;
    var res = buttonId.split("carBtn", 2);
    var serial = Number(res[1]);

    console.log("serial : " + serial)
    let name = $('#ncname' + serial).text()
    let reportDate = $('#ncreportdate' + serial).text()
    let department = $('#ncdepartment' + serial).text()
    let responsiblePerson = $('#ncresperson' + serial).text()
    let statement = $('#ncstatement' + serial).text()

    console.log("name: " + name + " reportDate: " + reportDate + " department : " + department + " responsiblePerson: " + responsiblePerson + " statement : " + statement);
    $('#carFormPart').show()
    $('#car_name').val(name)
    $('#car_report_date').val(reportDate)
    $('#car_department').val(department)
    $('#car_res_person').val(responsiblePerson)
    $('#car_statement').val(statement)
}

const carSubmitClicked = () => {
    var audit_name = $('#car_name').val()
    var reportDate = $('#car_report_date').val()
    var department = $('#car_department').val()
    var resPerson = $('#car_res_person').val()
    var statement = $('#car_statement').val()
    var rootCause = $('#car_rootCause').val()
    var proposedPlan = $('#car_proposedPlan').val()
    var dueDate = $('#car_dueDate').val()

    if (audit_name && reportDate && department && resPerson && statement && rootCause && proposedPlan && dueDate) {
        var newCAR = {
            audit_name: audit_name,
            report_date: reportDate,
            department: department,
            responsible_person: resPerson,
            statement: statement,
            root_cause: rootCause,
            action_plan: proposedPlan,
            due_date: dueDate
        }

        $.ajax({
            url: '/checkCAR',
            type: 'POST',
            data: newCAR,
            success: response => {
                console.log(response)
                    // test = response;
                alert(response.message)
            },
            error: response => {
                //console.log(response)
                $.ajax({
                    url: '/addNewCAR',
                    type: 'POST',
                    data: newCAR,
                    success: response => {
                        console.log(response)
                            // test = response;
                        alert(response.message)
                    },
                    error: response => {
                        console.log(response)
                    }

                })
            }

        })




    } else {
        alert('Enter Information in all fields properly')
    }
}