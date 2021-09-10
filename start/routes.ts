
import Route from '@ioc:Adonis/Core/Route'

Route.resource('/categories', 'CategoriesController').apiOnly()

Route.get('/', async () => {
  return { hello: 'world' }
})
