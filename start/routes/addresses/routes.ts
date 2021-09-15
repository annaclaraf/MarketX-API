import Route from '@ioc:Adonis/Core/Route'

Route.resource('/addresses', 'AddressesController').apiOnly()