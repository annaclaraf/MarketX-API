import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class UserAdminSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await User.createMany([
      {
        full_name: 'Anna Silva Feraz',
        email: 'annac@gmail.com',
        password: 'admin',
        phone_number: 12345678,
        birth_date: DateTime.fromISO('2000-11-02'),
        is_admin: true,
        address_id: 2
      }
    ])
  }
}
