'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('env')
const Youch = use('Youch')

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.message)
    }

    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      const errorJSON = await youch.toJSON()

      return response.status(error.status).send(errorJSON)
    }
  }

  async report (error, { request }) {
    console.log(error)
  }
}

module.exports = ExceptionHandler
