const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(morgan('common'))
app.use(helmet())
app.use(cors())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, 
  useCreateIndex : true })

const router = (routeArgs) => {
  return require('./routes/' + routeArgs)
}

app.use('/api/items/', router('items'))
app.use('/api/users/', router('users'))

app.use((req, res, next) => {
  if(!req.route) return next(new Error(`Not Found - ${req.originalUrl}`))
  next()
})

app.use((error, req, res, next) => {
  const {message} = error
  res.status(400).json({message})
})

const port = process.env.PORT || 1337
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
