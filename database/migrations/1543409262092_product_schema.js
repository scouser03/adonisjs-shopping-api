'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.decimal('price', 12, 2)
      table.timestamps()
    })

    this.create('image_product', (table) => {
    	table.integer('image_id').unsigned()
    	table.integer('product_id').unsigned()
      	table.foreign('image_id').references('id').on('images').onDelete('cascade')
      	table.foreign('product_id').references('id').on('products').onDelete('cascade')


    })
  }

  down () {
    this.drop('image_product')
    this.drop('products')
  }
}

module.exports = ProductSchema
