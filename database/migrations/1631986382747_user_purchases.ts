import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserPurchases extends BaseSchema {
  protected tableName = 'user_purchases'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('SET NULL')
        .onDelete('SET NULL')

      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('SET NULL')
        .onDelete('SET NULL')

      table.integer('quantity').notNullable()
      table.float('total_price')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
