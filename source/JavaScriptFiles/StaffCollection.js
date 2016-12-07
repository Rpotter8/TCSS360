/**
*	A class that represents StaffCollection
*	Author: Nursultan Irgaliyev
*	Date: 11/30/2016
**/

//imports
var mysql		= require('mysql');

//connect to the DB
var connection 	= mysql.createConnection({
	host     : 'cssgate.insttech.washington.edu',
	user     : '_360team11',
	password : 'HifOot',
	database : '_360team11',
});
	
//test connection 
connection.connect(function(err) {  
	if (err) { console.log(err);};
});

//makes the the functions enclosed in brackets visible from other files
module.exports = {
	
	/**
	*	Add a staff member to the DB
	*	Param: userName - userName of the staff member to add
	*   Param: password - password of the staff member to add
	*   Param: staffID - ID of the staff member to add
	*   Param: accessLevel - access level of the staff member to add 
	*          staff members have full access level
	**/
	add: function(userName, password, staffID, accessLevel) {
		var post = {userName: userName,
				password: password,
				staffID : staffID,
				accessLevel : accessLevel
		};
		connection.query('INSERT INTO staff SET ?', post, function(err, result) {
			if(err) { 
				console.log(err);
				return false;
			};	
		});
		return true;
		}
}

connection.end();