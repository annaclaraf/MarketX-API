import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IsAdmin {
  public async handle ({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    const { is_admin } = await auth.use('api').authenticate()

    if (is_admin) {
      return await next()
    }

    return response.send('Unauthorized')

  }
}
