'use strict'

class CategoryUpdate {
  get rules () {
    return {
      name: 'required',
      description: 'required',
    }
  }
}

module.exports = CategoryUpdate
