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
const Todo = db.Todo
const User = db.User
const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitializes: true
}))
app.use((express.urlencoded({ extended: true})))
app.use(methodOverride('_method'))
usePassport(app)

//瀏覽
app.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

//登入
app.get('/users/login', (req, res) => {
  res.render('login')
})

app.post('/users/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//註冊
app.get('/users/register', (req, res) => {
  res.render('register')
})

app.post('/users/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: { email } }).then(user => {
    if (user) {
      console.log('User already exists')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

//登出
app.get('/users/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

//查詢特定todo
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

//修改todo
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then((todo) => res.render('edit', { todo: todo.toJSON()}))
    .catch(error => console.log(error))
})
app.put('/todos/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findByPk(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then (() => res.redirect(`/todos/${id}`))
    .catch(error => {console.log(error)})
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})