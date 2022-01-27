require('./db/mongoose')
const path = require('path')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const appRoutes = require('../src/routes/app')

const app = express()

const port = process.env.PORT
const viewsPath = path.join(__dirname, '../gui/views')
const partialPath = path.join(__dirname, '../gui/partials')

//set up hbs engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
const publicDirectoryPath = path.join(__dirname, '../public/')

hbs.registerPartials(partialPath)

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser('secret'))
app.use(session({ cookie: { maxAge: 3600 } }))
app.use(express.static(publicDirectoryPath))

// flash message middleware
app.use((req, res, next) => {
  res.locals.message = req.session.message
  delete req.session.message
  next()
})

app.use(appRoutes)

app.listen(port, () => console.log(`Server is running on port ${port}`))
