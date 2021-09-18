import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/products', 'ProductsController.store')
    Route.put('/products/:id', 'ProductsController.update')
    Route.delete('/products/:id', 'ProductsController.destroy')
}).middleware(['auth', 'isAdmin'])

Route.get('/products', 'ProductsController.index')
Route.get('/products/:id', 'ProductsController.show')