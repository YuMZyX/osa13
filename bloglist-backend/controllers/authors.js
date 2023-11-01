const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {

  const blogs = await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('title')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    order: [
      ['likes', 'DESC']
    ]
  })
  res.json(blogs)
})

module.exports = router