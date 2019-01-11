'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.integer('image_id').unsigned()
      table.timestamps()
      table.foreign('image_id').references('id').on('images').onDelete('cascade')
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
