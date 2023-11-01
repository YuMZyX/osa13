const Blog = require('./blog')
const User = require('./user')
const UserReadings = require('./user_readings')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: UserReadings, as: 'readings' })
Blog.belongsToMany(User, { through: UserReadings, as: 'usersMarked' })

module.exports = {
  Blog, User
}