// This is the driver for the web app. It runs the server as well as conatins information
// on the individual views the web app has.

// Compiles all of the Jade files used into HTML.
var express = require('express')
, logger = require('morgan')
, app = express()
, homepage = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
, mainPage = require('jade').compileFile(__dirname + '/source/templates/main_page.jade')
, addPage = require('jade').compileFile(__dirname + '/source/templates/add_page.jade')

, editPage = require('jade').compileFile(__dirname + '/source/templates/edit_page.jade')

, deletePage = require('jade').compileFile(__dirname + '/source/templates/delete_page.jade')
, lookupStudent = require('jade').compileFile(__dirname + '/source/templates/lookup_student_page.jade')
, reloadlookupStudent = require('jade').compileFile(__dirname + '/source/templates/reload_lookup_student_page.jade')
// , studentReport = require('jade').compileFile(__dirname + '/source/templates/student_report_page.jade')
// , dataReport = require('jade').compileFile(__dirname + '/source/templates/data_report_page.jade')

, generatedStudent = require('jade').compileFile(__dirname + '/source/templates/generated_student_page.jade')
, studentsFulfill = require('jade').compileFile(__dirname + '/source/templates/students_fulfill_page.jade')

, loadedStudent = require('jade').compileFile(__dirname + '/source/templates/loaded_student_page.jade')
, reLogin = require('jade').compileFile(__dirname + '/source/templates/hompagealt.jade')
, reAddingStudent = require('jade').compileFile(__dirname + '/source/templates/hompagealt.jade')

, loadedLookupStudent = require('jade').compileFile(__dirname + '/source/templates/loaded_lookup_student_page.jade')
, student = require('./source/JavaScriptFiles/Student.js')

, submitAddJob = require('jade').compileFile(__dirname + '/source/templates/add_job.jade')
, submitAddDegree = require('jade').compileFile(__dirname + '/source/templates/add_degree.jade')
, submitAddSkill = require('jade').compileFile(__dirname + '/source/templates/add_skill.jade')

, job = require('./source/JavaScriptFiles/JobCollection.js')
, degree = require('./source/JavaScriptFiles/Degree.js')

//A Data connection for searching the database
var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'cssgate.insttech.washington.edu',
	user     : '_360team11',
	password : 'HifOot',
	database : '_360team11'
});

connection.connect(function(err) {

});


app.set('view engine', 'jade');

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

// The login page
app.get('/', function (req, res, next) {
	try {
		console.log('log in page')
		var html = homepage({ title: 'Home' })
		res.send(html)
	} catch (e) {
		next(e)
	}
})

//A page to list all the students in the datbase
app.get('/list_students', function(req, res){
  connection.query('SELECT * FROM students', function (err, results, fields) {
    if (err) {
      throw err;
    }
    //temp array to hold data
    var these = []
    these[0] = "Last Name 	First Name 	SID"
    for( var i = 0; i < results.length; ++i) {
    	if(results[i].lName.length > 6) {
    		these[i + 1] = results[i].lName + " 	" + results[i].fName + "		"  + results[i].studentID
    	} else {	
    		these[i + 1] = results[i].lName + " 		" + results[i].fName+ "		" + results[i].studentID
    	}
    }
    	//print info in the consolse and sent to view.
    	console.log(these)
    	res.render('list_students', {
    	title: results,
      	results: these

    });
  })
})


// Page after the login page
app.get('/newpage', function (req, res, next) {
	var username = req.query.username
	var password = req.query.password
	console.log(username + " " + password)
	//Checking to see if the user is in the database.
	// var post = {staff.userName = username AND staff.`password` = password}
	var query = connection.query("SELECT * FROM staff WHERE staff.userName = \"" + username 
		+ "\" AND staff.`password` = \"" + password + "\""
		, function(err, rows) {
		console.log(query.sql)
		if(rows[0] == undefined){
			try {
				var html = reLogin({ title: 'Home' })
				res.send(html)
			} catch (e) {
				next(e)
			}
		} else if(rows[0].userName == username && rows[0].password == password) {
  			try {
				var html = mainPage({ title: 'Home' })
				res.send(html)
			} catch (e) {
				next(e)
			} 
		}
	})

})


// page for going back to the mainPage
app.get('/back_homepage', function (req, res, next) {

	try {
		var html = mainPage({ title: 'Home' })
		res.send(html)
	} catch (e) {
		next(e)
	}
})


// page for adding new students
app.get('/add_student', function (req, res, next) {

	try {
		var html = addPage({ title: 'Home' })
		res.send(html)
	} catch (e) {
		next(e)
	}
})

// page for editing student
app.get('/edit_student', function (req, res, next) {
	try {
		var html = editPage({ title: 'Home' })
		res.send(html)
	} catch (e) {
		next(e)
	}
	
})


// page for deleting student
app.get('/delete_student', function (req, res, next) {
	if (req.query.st_id != ''){
	
		try {
			var html = deletePage({ title: 'Home' })
			res.send(html)
		} catch (e) {
			next(e)
		}
	}else {
		console.log('Please enter student id')
	}
})


// page for deleting student
app.get('/submit_delete', function (req, res, next) {	
	if (req.query.st_id != ''){		
		student.deleteStudent(req.query.st_id);
		try {
			var html = mainPage({ title: 'Home' })
			res.send(html)
		} catch (e) {
			next(e)
		}
	}else {
		
	}
})

// page for student report
app.get('/student_report', function (req, res, next) {
	connection.query('SELECT * FROM students LEFT OUTER JOIN job ON students.studentID=job.studentID'
			, function(err, results, fields) {
    	if (err) {
      	throw err;
    	}
    	console.log(results.length)

    	 //temp array to hold data
    	var these = []
    	var job = []
    	var n = 0
    	for(var i = 0; i < results.length; ++i) {
    		if(job.indexOf(results[i].employer) == -1 && results[i].employer != null) {
    			job[n] = results[i].employer
    			n++
    		}
    	}
    	console.log(job.length)

    	 //temp array to hold data
    	var peopleWith = []
    	var j = 0
    	for(var i = 0; i < results.length; ++i) {
    		if(results[i].employer != null && peopleWith.indexOf(results[i].studentID) == -1) {
    			peopleWith[j] = results[i].studentID
    			j++
    		}
    	}
    	these[0] = Math.round(peopleWith.length/results.length*100) + "% of students who have graduted have had a job.\n\n\nPEOPLE WHO CURRENTLY HAVE JOBS:"

    	 //temp array to hold data
    	var count = []
    	for(var i = 0; i < job.length; ++i) {
    		count[i] = 0
    		for(var m = 0; m < results.length; ++m) {
    			if(results[m].employer == job[i] && results[m].employer != null) {
    				count[i] = count[i] + 1
    			}
    		}
    	}

    	console.log(typeof count[0])

    	for(var i = 0; i < count.length; ++i) {
    		these[i +1] = "\n" + Math.round(count[i]/peopleWith.length*100) + "% have worked at " + job[i] + ".\n"
    			
    	}

    	these[count.length + 1] = "\n\nPEOPLE WHO HAVE GRADUATED:"

    	for(var i = 0; i < count.length; ++i) {
    		these[i + job.length + 2] = Math.round(count[i]/results.length*100 )+ "% have worked at " + job[i] +"."
    			
    	}
    	these[job.length + count.length + 3] = "	"
    	these[job.length + count.length + 4] = "These numbers are al rounded to the nearest\nwhole number."

    	res.render('list_students', {
      	title: results,
      	results: these

    });
  })
})

// Generates a report based on GPA's in the database
app.get('/gpa_report', function (req, res, next) {
	connection.query('SELECT * FROM students', function (err, results, fields) {
    	if (err) {
      	throw err;
    	}

    	var average = 0.0
    	for(var i = 0; i < results.length; ++i) {
    		average = average + Number(results[i].gpa)
    		
    	}
    	average = average / results.length
    	console.log(average)

    	 //temp array to hold data
    	var these = []
    	these[0] = "The Average Student GPA is: 		" + average.toFixed(2)
    	var count = 0
    	for(var i = 0; i < results.length; ++i) {
    		if(Number(results[i].gpa) > 3.5) {
    			count ++
    		}
    	}
    	console.log(count)
    	these[1] = "Student(s) above a 3.5: 		" + count
    	count = 0
    	for(var i = 0; i < results.length; ++i) {
    		if(Number(results[i].gpa) > 2.4 && Number(results[i].gpa) < 3.0) {
    			count ++
    		}
    	}
    	console.log(count)
    	these[3] = "Student(s) between a 2.5 and 3.4: 	" + count
    	count = 0
    	for(var i = 0; i < results.length; ++i) {
    		if(Number(results[i].gpa) < 3.6 && Number(results[i].gpa) > 2.9) {
    			count ++
    		}
    	}
    	console.log(count)
    	these[2] = "Student(s) between a 3.0 and 3.5: 	" + count
    	
   
    	these[4] = "\n\nAll values shown are inclusive\n\n"

    	these[5] = "Additioanlly the Institute requires a minimum GPA \nof 2.5 to graduate.\n\n"
    	these[6] = "Any student witha GPA below that is not included"
    	

    	res.render('list_students', {
      	title: results,
      	results: these
    });
  })
})

// page for lookup student
app.get('/lookup_student_report', function (req, res, next) {
	// console.log('Page for look up student')
	// console.log('student id = ' + req.query.st_id)
	try {
		var html = lookupStudent({ title: 'Home' })
		res.send(html)
	} catch (e) {
		next(e)
	}
})

//page for adding jobs for students. 
app.get('/submit_add_job', function(req, res, next) {
	try {
		var html = submitAddJob({title: 'Home'})
		res.send(html)
	} catch(e) {
		next(e)
	}
})

//page for adding degree for students.
app.get('/submit_add_degree', function(req, res, next) {
	try {
		var html = submitAddDegree({title: 'Home'})
		res.send(html)
	} catch(e) {
		next(e)
	}
})

//page for adding skill for studetns. 
app.get('/submit_add_skill', function(req, res, next) {
	try {
		var html = submitAddSkill({title: 'Home'})
		res.send(html)
	} catch(e) {
		next(e)
	}
})

//pagge for adding degree for students. 
app.get('/submit_add_degree_action', function(req, res, next) {
	if(req.query.degree_program != '', req.query.degree_level != '', req.query.st_id != '')
		var post = {degreeProgram: req.query.degree_program,
				degreeLevel: req.query.degree_level,
				studentID: req.query.st_id};
		connection.query('INSERT INTO degrees Set ?', post, function(err, result) {
			if(err) { 
				console.log(err);
				return false;
			};
		});
		try {
			var html = mainPage({title: 'Home'})
			res.send(html)
		} catch(e) {
			next(e)
		}
})

//page for adding skills for students.
app.get('/submit_add_skill_action', function(req, res, next) {
	if(req.query.degree_skill != '', req.query.st_id != '')
		var post = {skill: req.query.skill,
				studentID: req.query.st_id};
		connection.query('INSERT INTO skills Set ?', post, function(err, result) {
			if(err) { 
				console.log(err);
				return false;
			};
		});
		try {
			var html = mainPage({title: 'Home'})
			res.send(html)
		} catch(e) {
			next(e)
		}
})

//page for adding jobs for students. 
app.get('/submit_add_job_action', function(req, res, next) {
	if(req.query.employer != '', req.query.salary != '', req.query.start_date != '', req.query.end_date != '', req.query.fullTime != '', req.query.title != '', req.query.st_id != '')
	var fulltime
	if(req.query.fullTime == 'True' || req.query.fullTime == 'true' || req.query.fullTime == 'yes' || req.query.fullTime == 'Yes') {
		fulltime = 1
	} else {
		fulltime = 0
	}
	
	job.addJob(req.query.employer, req.query.salary, req.query.start_date, req.query.end_date, fulltime, req.query.title, req.query.st_id)
	try {
		var html = mainPage({title: 'Home'})
		res.send(html)
	} catch(e) {
		next(e)
	}
})

// page for lookup student with desired info.s
app.get('/loaded_lookup_student_report', function (req, res, next) {
	console.log('loaded lookup student.')
	// console.log('student id = ' + req.query.st_id)
	var these = []
	connection.query("SELECT * FROM students WHERE students.studentID = \"" + req.query.st_id + "\"", 
		function(err, results,rows) {

		// console.log(query.sql)
		console.log('result[0] = ' + results[0])

		if(results[0] == undefined) {
			console.log('Please enter correct data\n')
			try {
				var html = reloadlookupStudent({ title: 'Home' })
				res.send(html)
			} catch (e) {
				next(e)
			}
		} else {
			
    		these[0] = "Last Name 		" + results[0].lName 
    		these[1] = "First Name 		" + results[0].fName 
    		these[2] = "Student Id 		" + results[0].studentID 

    		if (results[0].graduationTerm == 'null') {
    			these[3] = "Graduation Term 	" + 'No Record';
    		} else { 
    			these[3] = "Graduation Term 	" + results[0].graduationTerm
    		}

    		if (results[0].graduationYear == 'null') {
    			these[4] = "Graduation Year 	" + 'No Record';
    		} else { 
    			these[4] = "Graduation Year 	" + results[0].graduationYear
    		}

    		if (results[0].externalEmail == 'null') {
    			these[5] = "Externam Email 	" + 'No Record';
    		} else { 
    			these[5] = "Externam Email 		" + results[0].externalEmail
    		}
    		
    		if (results[0].uwEmail == 'null') {
    			these[6] = "UW Email 	" + 'No Record';
    		} else { 
    			these[6] = "UW Email 		" + results[0].uwEmail
    		}

    		if (results[0].uwEmail == 'null') {
    			these[7] = "GPA 	" + 'No Record';
    		} else { 
    			these[7] = "GPA  			" + results[0].gpa
    		}
    		
    		connection.query("SELECT * FROM degrees WHERE degrees.studentID = \"" + req.query.st_id + "\"", 
				function(err, results,rows) {
					// console.log('come looking for degrees' + results[0].degreeProgram)
					if(results[0] == undefined || results[0] == 'null') {
						these[8] = "Degree Program 		" + "No Record";
	    				these[9] = "Degree Level		" + "No Record";
					} else {
						these[8] = "Degree Program 		" + results[0].degreeProgram
	    				these[9] = "Degree Level		" + results[0].degreeLevel 
	    			}
    			connection.query("SELECT * FROM skills WHERE skills.studentID = \"" + req.query.st_id + "\"", 
				function(err, results,rows) {
					if(results[0] == undefined || results[0] == 'null') {
						these[10] = "Skill			" + "No Record";
					} else {
						these[10] = "Skill			" + results[0].skill 
					}
						
					connection.query("SELECT * FROM job WHERE job.studentID = \"" + req.query.st_id + "\"", 
					function(err, results,rows) {
						if(results[0] == undefined || results[0] == 'null') {
							these[11] = "Job Title		" + "No Record";
							these[12] = "Sallary			" + "No Record";
						} else {
							these[11] = "Job Title		" + results[0].jobTItle
							these[12] = "Sallary			" + results[0].salary
						}
						console.log(these)
	    				res.render('list_students', {
	      				title: results,
	      				results: these
	    				});	
	    			})
				})	

			})
		}
	})
	
})


// page for submit add student
app.get('/submit_add', function (req, res) {
  // Prepare output in JSON format  
  	if (req.query.st_id != '' && req.query.f_name != '' && req.query.l_name != '') {
  		console.log(req.query.st_id + req.query.f_name + req.query.l_name)
  		//add new student with correct data
		student.addStudent(req.query.f_name, req.query.l_name, req.query.st_id
			, req.query.degree, req.query.degree_level, req.query.grad_term, req.query.grad_year
			, req.query.ext_mail, req.query.uw_mail, req.query.gpa);  		
  		console.log(req.query.gpa)
  	try {
  			var html = mainPage({ title: 'Home' })
	  		res.send(html)
  		} catch (e) {
	  		next(e)
  		}
	} else {
		console.log('Please enter correct data\n')
	}
})



// page for loaded student
app.get('/loaded_student_report', function (req, res, next) {
	if(req.query.st_id != '' && req.query.l_name != '' && req.query.f_name != '' && req.query.ext_mail != '' && req.query.uw_mail != '') {
		student.updateStudent(req.query.st_id, req.query.f_name, req.query.l_name, req.query.ext_mail, req.query.uw_mail);
		console.log(req.query.st_id+ req.query.f_name+ req.query.l_name + req.query.ext_mail + req.query.uw_mail)
		try {
			var html = editPage({ title: 'Home' })
			res.send(html)
		} catch (e) {
			next(e)
		}
	}
})

//local host run
app.listen(process.env.PORT || 3000, function () {
	console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})


