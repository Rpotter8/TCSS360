// This is the driver for the web app. It runs the server as well as conatins information
// on the individual views the web app has.

// Variables for building the enviroment
var express = require('express')
  , logger = require('morgan')
  , app = express()
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')
  , template2 = require('jade').compileFile(__dirname + '/source/templates/main_page.jade')
  , template3 = require('jade').compileFile(__dirname + '/source/templates/add_page.jade')

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

// The login page
app.get('/', function (req, res, next) {
  try {
    var html = template({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})


// Page after teh login page
app.get('/newpage', function (req, res, next) {
  try {
    var html = template2({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.get('/add_student', function (req, res, next) {
  try {
    var html = template3({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})


app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})