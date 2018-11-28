'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoryProductSchema extends Schema {
  up () {
    this.create('category_products', (table) => {
      table.increments()
      table.integer('product_id').unsigned()
      table.integer('category_id').unsigned()
      table.foreign('product_id').references('id').on('products').onDelete('cascade')
      table.foreign('category_id').references('id').on('categories').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('category_products')
  }
}

module.exports = CategoryProductSchema
