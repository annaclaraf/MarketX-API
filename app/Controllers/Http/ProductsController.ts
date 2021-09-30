import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Image from 'App/Models/Image'
import Product from 'App/Models/Product'
import CreateProductValidator from 'App/Validators/CreateProductValidator'
import UpdateProductValidator from 'App/Validators/UpdateProductValidator'

export default class ProductsController {
  public async index ({ request }: HttpContextContract) {
    const { page, perPage } = request.qs()
    
    const filters = request.only(['name', 'category', 'priceRange', 'brand'])

    const products = await Product.query()
      .preload('category')
      .preload('images')
      .filter(filters)
      .paginate(page, perPage)

    return products
  }

  public async store ({ request }: HttpContextContract) {
    const data = await request.validate(CreateProductValidator)

    const product = await Product.create(data)

    await product.load('category')

    return product
  }

  public async show ({ params }: HttpContextContract) {
    const product = await Product.findByOrFail('id', params.id)

    await product.load('category')
    await product.load('images')

    return product
  }

  public async update ({ request, params }: HttpContextContract) {
    const data = await request.validate(UpdateProductValidator)

    const product = await Product.findByOrFail('id', params.id)

    await product.merge(data).save()

    await product.load('category')

    return product
  }

  public async destroy ({ params }: HttpContextContract) {
    const product = await Product.findByOrFail('id', params.id)

    await product.delete()

    return product
  }

  public async upload ({ request, params }: HttpContextContract) {
    const product = await Product.findByOrFail('id', params.id)
    
    const images = request.files('images')

    if (images.length === 0) {
      throw new Error ('Invalid image')
    }
  
    for (let image of images) {
      await image.move(Application.tmpPath('uploads'))
      
      await Image.create({
        productId: product.id,
        path: image.fileName
      })
    }

    return "Image upload successfully"
  }
}
