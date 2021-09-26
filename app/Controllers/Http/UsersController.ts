import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import AddressesController from './AddressesController'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const { page } = request.all()

    const users = await User.query().preload('address').paginate(page, 10)

    return users
  }

  public async store (ctx: HttpContextContract) {
    const { request } = ctx
    const trx = await Database.transaction()

    try {
      const data = await request.validate(CreateUserValidator)
  
      const address = await new AddressesController().store(ctx, trx)

      const user = await User.create({
          ...data,
          addressId: address.id
        }, { client: trx }
      )
  
      await trx.commit()

      await user.load('address')
  
      return user
    } catch (error) {
      await trx.rollback()

      throw error
    }
  }

  public async show ({ params, auth }: HttpContextContract) {
    if(auth.user?.id != params.id && !auth.user?.is_admin ) {
      throw new Error("Unauthorized")
    }

    const user = await User.findByOrFail('id', params.id)

    await user.load('address')

    return user
  }

  public async update (ctx : HttpContextContract) {
    const { request, params, auth } = ctx

    if(auth.user?.id != params.id && !auth.user?.is_admin ) {
      throw new Error("Unauthorized")
    }

    const trx = await Database.transaction()

    try {
      const data = await request.validate(UpdateUserValidator)

      await new AddressesController().update(ctx, trx)
      
      const user = await User.findByOrFail('id', params.id, { client: trx })
      
      await user.merge(data).save()

      await user.load('address')

      await trx.commit()

      return user
    } catch (error) {
      await trx.rollback()

      throw error
    }
  }

  public async destroy ({ params }: HttpContextContract) {
    const user = await User.findByOrFail('id', params.id)

    await user.delete()

    return user
  }
}
