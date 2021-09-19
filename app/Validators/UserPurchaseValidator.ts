import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserPurchaseValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    quantity: schema.number(),
    product_id: schema.number([rules.exists({ table: 'products', column: 'id' })])
  })

  public messages = {}
}
