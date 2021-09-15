import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import Address from './Address'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public full_name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public phone_number: number

  @column()
  public birth_date: DateTime

  @column()
  public is_admin: boolean

  @column()
  public address_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Address, {
    foreignKey: 'address_id'
  })
  public address: HasOne<typeof Address>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeSave()
  public static async isAdmin(user: User) {
    if(user.$dirty.is_admin !== true) {
      user.is_admin = false
    }
  }
}
