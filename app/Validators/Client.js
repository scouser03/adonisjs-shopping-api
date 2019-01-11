'use strict'

class Client {
  get rules () {
    return {
    	name:'required',
    	surname:'required',
      	email: 'required|email|unique:users',
      	password: 'required|confirmed'
    }
  }
}

module.exports = Client
