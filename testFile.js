

var assert = require('assert');
var student = require('./source/JavaScriptFiles/Student.js');
var job = require('./source/JavaScriptFiles/JobCollection.js');
var degree = require('./source/JavaScriptFiles/Degree.js');
/**
 * Test the listStudent() and addStudent() functions from the Student file
**/
describe('listStudents and addStudent Tests', function() {
	it('passes if after adding a student the size of the list retured is +1', function(done) {
		student.listStudents(function(err, result1) {
			var fName = 'Ben', lName = 'Russell', studentID = '1';
			student.addStudent(fName, lName, studentID);
			student.listStudents(function(err, result2) {
				assert.equal(result1.length + 1, result2.length, 'addStudent does not add up');
				done();
			});
			student.deleteStudent(studentID);
		});
	});
});
/**
 * Test the listStudent() and deleteStudent() functions from the Student file
**/
describe('listStudents and deleteStudent Tests', function() {
	it('passes if after deleteing a student the size of the list retured is -1', function(done) {
		var fName = 'Ben', lName = 'Russell', studentID = '1';
		student.addStudent(fName, lName, studentID);
		student.listStudents(function(err, result1) {
			var fName = 'Ben', lName = 'Russell', studentID = '1';
			student.deleteStudent(studentID);
			student.listStudents(function(err, result2) {				
				assert.equal(result1.length - 1, result2.length);
				done();
			});
		});
	});
});
/**
 * Test the updateStudent() and retrieveStudent() functions from the Student file
**/
describe('updateStudent retrieveStudent Test', function() {
		it('passes if the update succeedes.', function(done) {
			var fName = 'Ben', lName = 'Russell', studentID = '1';
			student.addStudent(fName, lName, studentID);			
			student.updateStudent(studentID, 'Ben', 'Henry', 'extEmail@msn.com', 'uwEmail@uw.edu');	
			student.retrieveStudent(studentID, function(err, result) {				
				assert.equal(result[0].fName, 'Ben', 'fName is not Ben');	
				assert.equal(result[0].lName, 'Henry', 'lName is not Henry');
				assert.equal(result[0].externalEmail, 'extEmail@msn.com', 'External Email is not right');
				assert.equal(result[0].uwEmail, 'uwEmail@uw.edu', 'Email is not right');
				done();
			});			
		});
});
/**
 * Test the listDegrees() and addDegree() functions from the Degree file
**/
describe('test for listDegrees() and addJob()', function() {
    it('asserts equal if after adding a student the size of the list retured is +1', function(done) {
        degree.listDegrees(function(err, result1) {
            var degreeName = 'PhD.', degreeLevel = 'Master', studentID = '1';
            degree.addDegree(degreeName, degreeLevel, studentID);
            degree.listDegrees(function(err, result2) {
                assert.equal(result1.length + 1, result2.length, 'thats not a degree list');
                done();
            });
        });
    });
});
