'use strict'

/*
|--------------------------------------------------------------------------
| ClientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const User = use('App/Models/User')

class ClientSeeder {
  async run () {
  	if(User.getCount() === 0){
  		return await Factory.model('App/Models/User').createMany(10)
  	}
  }
}

module.exports = ClientSeeder
