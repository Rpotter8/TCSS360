Student Acheivement Tacker
By: Ryan Potter, Ben, Mohib, Dorian

CHANGES FROM PHASE II SUBMISSION:
Please see the submitted Phase III document's apendix.

IMPLEMENTATION:
+++++++++++++++++++++++++++++++++++++++++
INSTALLATION INSTRUCTIONS:

If you do not wish to run this app locally feel free to visit:

https://student-success-tracker.herokuapp.com

Please note that this is a server not designed for production use and it sleeps when not in use.
Sometimes that means it can take awhile for the server to respond causing the MySQL connection to timeout.
Currently it has to be relaunched to fix that error.

The login information is as follows:

USERNAME: "tcss360"
PASSWORDL "Password"


For local use (And much more stable):
Install Node.js from: https://nodejs.org/en/download/

Direct your command line to the containing folder and type:

  npm install npm@latest -g
  npm install
  npm start
  
Type localhost:3000 insto your browser.
Use the above log in information to access the site both locally and on the webpage.
All instances of this webapp access the same database.
++++++++++++++++++++++++++++++++++++++++++++++++++++++



TESTING:
Navigate in the command line to the containing folder.
  Type    "npm install mocha"     to install the testing framework
  Type    "mocha testFile.js"     to run the test suite
  
  
README:
For Project Phase 3, the use cases that were implemented are:
Add Student: By Ryan
Update student:	By Ben
Delete student:	By Ben
Job Report:	By Ryan
GPA Report:	By Ryan
List Students:	By Ryan
Lookup Student:	By Mohib
Add Job:		By Ryan
Add Degree:	By Mohib
Add Skill:	By MOhib
At the moment all the above use cases are implemented, and are functioning.


ISSUES:

Many of the Objects we created in JavaScript for returning database query are not transfering out of 
their file. We use the callback method that JavaScript has for the asychronous computing that is inherent
to JavaScript but those functions don't consistently return results. We have workarounds in place for the functions
that fail. This did cause us to have to deviate from our class diagram though. The class diagram represents
what the connectivity between objects would be if we had managed to acheive the connectivity that we wanted.

Additionally our testing has issues. We were unable to test the functionality in server.js becasue it is a router and acts sort of like our "main" function in Java. Because of the previously mentioned workarounds it was hard to test our queries. But every function that we did call from server.js has a test.







