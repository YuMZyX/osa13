const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { User, Session } = require('../models')

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: 'Malformatted data or incorrect type' })
  } else if (error.name ===  'JsonWebTokenError') {
    return res.status(401).json({ error: 'token missing or invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const sessionCheck = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  const session = await Session.findOne({
    where: {
      userId: user.id
    }
  })

  if (!user.disabled && session) {
    console.log('Session valid, proceeding...')
  } else if (!session) {
    return res.status(401).json({ error: 'Session not found, please login again' })
  } else if (user.disabled) {
    await Session.destroy({
      where: {
        userId: user.id
      }
    })
    req.decodedToken = ''
    return res.status(401).json({ error: 'Username disabled, contact admin' })
  }

  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  sessionCheck
}