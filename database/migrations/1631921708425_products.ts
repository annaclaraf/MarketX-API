import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('SET NULL')
        .onDelete('SET NULL')
      
      table.string('name').unique().notNullable()
      table.string('description').notNullable()
      table.string('brand').notNullable()
      table.integer('stock_quantity').notNullable()
      table.float('price').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
