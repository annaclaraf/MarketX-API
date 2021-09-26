import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/purchases', 'UserPurchasesController.store')
    Route.get('/purchases', 'UserPurchasesController.index')
    Route.get('/purchases/:id', 'UserPurchasesController.show')
}).middleware('auth')
