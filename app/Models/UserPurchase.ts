import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import User from './User'
import Product from './Product'

export default class UserPurchase extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantity: number

  @column()
  public total_price: number

  @column()
  public user_id: number

  @column()
  public product_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => User, {
    foreignKey: 'user_id'
  })
  public user: HasOne<typeof User>

  @hasOne(() => Product, {
    foreignKey: 'product_id'
  })
  public product: HasOne<typeof Product>
}
