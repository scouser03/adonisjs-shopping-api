'use strict'

const Category = use('App/Models/Category')
const Image = use('App/Models/Image')
const { str_random } = use('App/Helpers')
const Helpers = use('Helpers')
const Database = use('Database')
/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const categories = await Category.query().paginate()
    return response.send({categories})
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try{
      const trx = await Database.beginTransaction()
      const { name, description } = request.all()

      const image = request.file('image', {
        types:['image'],
        size: '2mb'
      })

      const random_name = await str_random(30)
      let filename = `${new Date().getTime()}-${random_name}.${image.subtype}`;

      await image.move(Helpers.publicPath('uploads'), {
        name: filename
      })

      if(! image.moved()){
        throw image.error()
      }

      const categoryImage = await Image.create({
        path: filename,
        size: image.size,
        original_name: image.clientName,
        extension: image.subtype
      }, trx)
      const category = await Category.create({
        name,
        description,
        image_id: categoryImage.id
      },trx)

      await trx.commit()
      return response.status(201).send({category})
    }catch(e){
      await trx.rollback()
      return response.status(400)
        .send({
          message: "incorrect data", 
          error: e.message
        })
    }
    
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const category = await Category.findOrFail(params.id)
    return response.send({category})
  }

  
  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
     const trx = await Database.beginTransaction()
     try{
      const category = await Category.findOrFail(params.id)
      category.merge(request.all())

      const image = request.file('image', {
        types:['image'],
        size: '2mb'
      })

      if(image){
        const random_name = await str_random(30)
        let filename = `${new Date().getTime()}-${random_name}.${image.subtype}`;

        await image.move(Helpers.publicPath('uploads'), {
          name: filename
        })

        if(! image.moved()){
          throw image.error()
        }

        const categoryImage = await Image.create({
          path: filename,
          size: image.size,
          original_name: image.clientName,
          extension: image.subtype
        }, trx)

        category.image_id = categoryImage.id
      }

      
      await category.save(trx)
      await trx.commit()
      return response.send(category)
     }catch(e){
        await trx.rollback()
        return response.status(400)
        .send({
          message: "incorrect data", 
          error: e.message
        })

     }
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const category = await Category.find(params.id)
    category.delete()
    return response.send({message: "success"})
  }
}

module.exports = CategoryController
