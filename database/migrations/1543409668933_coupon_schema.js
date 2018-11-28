'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CouponSchema extends Schema {
  up () {
    this.create('coupon_type', (table) => {
      table.increments()
      table.string('name').notNullable()
	  table.text('description').notNullable()
    })
    this.create('coupons', (table) => {
      table.increments()
      table.decimal('discount', 12, 2)
	  table.integer('type_id').unsigned()
      table.timestamps()

      table.foreign('type_id').references('id').on('coupon_type').onDelete('cascade')
    })
  }

  down () {
    this.drop('coupons')
    this.drop('coupon_type')
  }
}

module.exports = CouponSchema
