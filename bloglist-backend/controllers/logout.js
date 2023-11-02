const router = require('express').Router()
const User = require('../models/user')
const Session = require('../models/session')
const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async(req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  await Session.destroy({
    where: {
      userId: user.id
    }
  })
  req.decodedToken = ''
  res.send(`${user.name} logged out`)
})

module.exports = router