import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import AdminValidator from 'App/Validators/AdminValidator'

export default class AdminsController {
    public async changeAdmin({ request }: HttpContextContract) {
        const data = await request.validate(AdminValidator)
        const { email } = request.only(['email'])

        const user = await User.findByOrFail('email', email)

        user.is_admin ? user.is_admin = false : user.is_admin = true

        await user.merge(data).save()

        return user
    }
}
