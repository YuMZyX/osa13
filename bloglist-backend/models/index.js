const Blog = require('./blog')
const User = require('./user')
const Session = require('./session')
const UserReadings = require('./user_readings')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: UserReadings, as: 'readings' })
Blog.belongsToMany(User, { through: UserReadings, as: 'usersMarked' })

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  Blog, User, UserReadings, Session
}