import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import CreateAddressValidator from 'App/Validators/CreateAddressValidator'
import UpdateAddressValidator from 'App/Validators/UpdateAddressValidator'

export default class AddressesController {
    public async index({ }: HttpContextContract) {
        const addresses = await Address.all()

        return addresses
    }

    public async store({ request }: HttpContextContract) {
        await request.validate(CreateAddressValidator)
        const { street, city, state, postal_code, country } = request.only([ 'street', 'city', 'state', 'postal_code', 'country'])

        const address = await Address.create({
            street, city, state, postal_code, country
        })

        return address
    }

    public async show({ params }: HttpContextContract) {
        const address = await Address.findByOrFail('id', params.id)

        return address
    }

    public async update({ request, params }: HttpContextContract) {
        await request.validate(UpdateAddressValidator)
        const payload = request.only([ 'street', 'city', 'state', 'postal_code', 'country'])

        const address = await Address.findByOrFail('id', params.id)

        await address.merge(payload).save()

        return address
    }

    public async destroy({ params }: HttpContextContract) {
        const address = await Address.findByOrFail('id', params.id)

        await address.delete()

        return address
    }
}
