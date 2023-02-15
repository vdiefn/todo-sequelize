const express = require('express')
const exphbs = require('express-handlebars')
const passport = require('passport')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const db = require('./models')
const session = require('express-session')
const usePassport = require('./config/passport')
const todo = require('./models/todo')
const routes = require('./routes')
const flash = require('connect-flash')
const { PromiseConnection } = require('mysql2/promise')
const Todo = db.Todo
const User = db.User
const app = express()

if(process.env.Node !== 'production'){
  require('dotenv').config()
}

const PORT = process.env.PORT

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
