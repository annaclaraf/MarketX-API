import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async index ({}: HttpContextContract) {
    const users = await User.all()

    return users
  }

  public async store ({ request }: HttpContextContract) {
    const data = await request.validate(CreateUserValidator)

    const user = await User.create(data)

    return user
  }

  public async show ({ params }: HttpContextContract) {
    const user = await User.findByOrFail('id', params.id)

    return user
  }

  public async update ({ request, params }: HttpContextContract) {
    const data = await request.validate(UpdateUserValidator)

    const user = await User.findByOrFail('id', params.id)

    await user.merge(data).save()

    return user
  }

  public async destroy ({ params }: HttpContextContract) {
    const user = await User.findByOrFail('id', params.id)

    await user.delete()

    return user
  }
}
