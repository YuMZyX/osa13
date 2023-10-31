const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: 'Mandatory fields are missing or null, adding to database cancelled' })
  } else if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({ error: 'Malformatted data or incorrect type' })
  } 

  next(error)
}

module.exports = {
  errorHandler
}