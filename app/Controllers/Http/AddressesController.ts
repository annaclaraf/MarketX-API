import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'
import Address from 'App/Models/Address'
import User from 'App/Models/User'
import CreateAddressValidator from 'App/Validators/CreateAddressValidator'
import UpdateAddressValidator from 'App/Validators/UpdateAddressValidator'

export default class AddressesController {
    public async index({ request }: HttpContextContract) {
        const { page } = request.all()

        const addresses = await Address.query().paginate(page, 10)

        return addresses
    }

    public async store({ request }: HttpContextContract, trx?: TransactionClientContract) {
        await request.validate(CreateAddressValidator)
        const { street, city, state, postal_code, country } = request.only([ 'street', 'city', 'state', 'postal_code', 'country'])

        const newAddress = {
            street: street,
            city: city,
            state: state,
            postal_code: postal_code,
            country: country
        }

        const address = await Address.create(newAddress, { client: trx })

        return address
    }

    public async show({ params }: HttpContextContract) {
        const address = await Address.findByOrFail('id', params.id)

        return address
    }

    public async update({ request, params }: HttpContextContract, trx?: TransactionClientContract) {
        await request.validate(UpdateAddressValidator)
        const payload = request.only([ 'street', 'city', 'state', 'postal_code', 'country'])

        const user = await User.findByOrFail('id', params.id)

        const address = await Address.findByOrFail('id', user.addressId, { client: trx })

        await address.merge(payload).save()

        return address
    }

    public async destroy({ params }: HttpContextContract) {
        const address = await Address.findByOrFail('id', params.id)

        await address.delete()

        return address
    }
}
