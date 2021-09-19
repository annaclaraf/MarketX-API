import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/purchases', 'UserPurchasesController.store')
    Route.get('/purchases', 'UserPurchasesController.index')
}).middleware('auth')

Route.get('/purchases/:id', 'UserPurchasesController.show').middleware('isAdmin')