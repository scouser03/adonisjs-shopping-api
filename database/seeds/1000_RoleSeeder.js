'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('Role')

class RoleSeeder {
  async run () {
      const admin = new Role()
      admin.name = 'Admin'
      admin.slug = 'admin'
      admin.description = 'Admin of system'
      await admin.save()

      const manager = new Role()
      manager.name = 'Manager'
      manager.slug = 'manager'
      manager.description = 'Manager of system'
      await manager.save()

      const client = new Role()
      client.name = 'Client'
      client.slug = 'client'
      client.description = 'Client of system'
      await client.save()

  }
}

module.exports = RoleSeeder
