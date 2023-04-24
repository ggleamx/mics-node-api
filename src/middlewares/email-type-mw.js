const productNotAvailableSchema = require('../schemas/product-not-available-schema')
const Response = require('../models/response-model')
const EmailProvider = require('../config/email')
const Utils = require('../utils')

function checkEmailType (req, res, next) {
  const type = req.params.type

  switch (type) {
    case 'productNotAvailable': {
      const { error, value } = productNotAvailableSchema.validate(req.body)

      if (error === undefined) {
        req.params.emailBody = getProductsNotAvailableTemplate(value);
        req.params.user = value;
        next()
        break
      } else {
        const message = error.details[0].message

        return res.json(new Response(true, message))
      }
    }

    default: {ƒ
      return res.json(new Response(true, `Email type ${type} dont exist.`))
    }
  }
}


function getProductsNotAvailableTemplate (value) {
    const emailProvider = EmailProvider.getInstance()
  
    const template = emailProvider.savedEmails.find(obj => {
      return obj.type === 'productNotAvailable'
    })
  
    const mapObj = {
      username: value.username,
      itemname: value.itemname,
      itemid: value.itemid,
      useremail: value.useremail,
      itemimg: value.itemimg
    }
  
    return Utils.replaceAll(template.body, mapObj)
  }
  

module.exports = checkEmailType
