import Route from '@ioc:Adonis/Core/Route'

Route.post('/users', 'UsersController.store')

Route.group(() => {
    Route.put('/users/:id', 'UsersController.update')
    Route.get('/users/:id', 'UsersController.show')
}).middleware('auth')

Route.group(() => {
    Route.get('/users', 'UsersController.index')
    Route.delete('/users/:id', 'UsersController.destroy')
}).middleware('isAdmin')