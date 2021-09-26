import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator'

export default class CategoriesController {
  public async index({ request }: HttpContextContract) {
    const { page } = request.all()

    const categories = await Category.query().paginate(page, 10)

    return categories
  }


  public async store({ request }: HttpContextContract) {
    await request.validate(CreateCategoryValidator)
    const { name, description } = request.only(['name', 'description'])

    const category = await Category.create({
      name,
      description,
    })

    return category
  }

  public async show({ params }: HttpContextContract) {
    const category = await Category.findByOrFail('id', params.id)

    return category
  }


  public async update({ request, params }: HttpContextContract) {
    await request.validate(UpdateCategoryValidator)
    const payload = request.only(['name', 'description'])

    const category = await Category.findByOrFail('id', params.id)

    await category.merge(payload).save()

    return category

  }

  public async destroy({ params }: HttpContextContract) {
    const category = await Category.findByOrFail('id', params.id)

    await category.delete()

    return category
  }
}
