import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import UserPurchase from 'App/Models/UserPurchase'
import UserPurchaseValidator from 'App/Validators/UserPurchaseValidator'

export default class UserPurchasesController {
  public async index ({ auth }: HttpContextContract) {
    if(auth.user?.is_admin){
      const purchases = await UserPurchase.all()
      return purchases
    }

    const user_id = auth.user?.id

    const purchases = await UserPurchase.findByOrFail('user_id', user_id)

    await purchases.load('user')
    await purchases.load('product')

    return purchases
  }

  public async store ({ request, auth }: HttpContextContract) {
    await request.validate(UserPurchaseValidator)

    const { quantity, product_id } = request.only(['quantity', 'product_id'])

    const product = await Product.findByOrFail('id', product_id)

    const stockQuantity = product.stock_quantity

    if(quantity > stockQuantity) {
      throw new Error("Insufficient stock");
    }

    const price = product.price
    
    const total_price = quantity * price
    
    const userId = auth.user?.id 

    const purchase = await UserPurchase.create({
      userId,
      productId: product_id,
      quantity,
      total_price
    })

    const updatedStock = stockQuantity - quantity
    
    await product.merge({ stock_quantity: updatedStock }).save()

    await purchase.load('user')
    await purchase.load('product')

    return purchase 
  }

  public async show ({ params, auth }: HttpContextContract) {
    const user_id = auth.user!.id

    const purchase = await UserPurchase.query() 
      .where('id', params.id)
      .where('user_id', user_id)

    return purchase
  }
}
