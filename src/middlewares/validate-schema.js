const Response = require('../models/response-model')

exports.validateSchema = function (schema) {
  return async (req, res, next) => {
    const { error, value } = schema.validate(req.body)

    if (error === undefined) {
      req.body = value;
      next()
    } else {
      const message = error.details[0].message

      return res.status(400).json(new Response(true, message))
    }
  }
}
