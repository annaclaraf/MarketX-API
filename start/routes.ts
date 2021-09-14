import Route from '@ioc:Adonis/Core/Route'

Route.resource('/categories', 'CategoriesController').apiOnly()
Route.resource('/addresses', 'AddressesController').apiOnly()
Route.resource('/users', 'UsersController').apiOnly()

Route.get('/', async () => {
  return { hello: 'world' }
})
