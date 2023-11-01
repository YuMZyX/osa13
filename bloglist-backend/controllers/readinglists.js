const router = require('express').Router()
const UserReadings = require('../models/user_readings')

router.post('/', async (req, res) => {
  console.log(req.body)
  const reading = await UserReadings.create({
    userId: req.body.user_id,
    blogId: req.body.blog_id
  })
  res.json(reading)
})

module.exports = router