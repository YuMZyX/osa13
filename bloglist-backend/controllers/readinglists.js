const router = require('express').Router()
const UserReadings = require('../models/user_readings')
const { tokenExtractor, sessionCheck } = require('../util/middleware')
const { User } = require('../models')

router.post('/', async (req, res) => {
  const reading = await UserReadings.create({
    userId: req.body.user_id,
    blogId: req.body.blog_id
  })
  res.json(reading)
})

router.put('/:id', tokenExtractor, sessionCheck, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const reading = await UserReadings.findOne({
    where: {
      user_id: user.id,
      id: req.params.id
    }
  })

  if (reading) {
    reading.read = req.body.read
    await reading.save()
    res.json(reading)
  } else {
    return res.status(404).json({ error: 'Not allowed to alter blogs that are not in your reading list.' })
  }
})

module.exports = router