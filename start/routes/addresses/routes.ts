import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/addresses', 'AddressesController.index')
    Route.get('/addresses/:id', 'AddressesController.show')
    Route.post('/addresses', 'AddressesController.store')
    Route.put('/addresses/:id', 'AddressesController.update')
    Route.delete('/addresses/:id', 'AddressesController.destroy')
}).middleware('isAdmin')