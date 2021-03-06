'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
// const Validator = use('Validator')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

//authenticated routes
Route.group(() => {
	Route.post('/register', 'AuthController.register').as('auth.register').validator('ClientRegister')
	Route.post('/login', 'AuthController.login').as('auth.login')
	Route.post('/refresh', 'AuthController.refresh').as('auth.refresh')
	Route.post('/logout', 'AuthController.logout').as('auth.logout').middleware(['auth'])
})
	.prefix('v1/auth')
	.namespace('Auth')

//Admin routes

Route.group(() => {
	Route.resource('category', 'CategoryController')
		.apiOnly()
		.validator(new Map([
			[['category.store'], ['Category/Store']],
			[['category.update'], ['Category/Update']]
		]))
	Route.resource('product', 'ProductController').apiOnly()
	Route.resource('coupon', 'CouponController').apiOnly()
	Route.resource('order', 'OrderController').apiOnly()
	Route.post('images/uploads', 'ImageController.uploads')
})
	.prefix('v1/admin')
	.namespace('Admin')
	.middleware(['auth', 'is:(admin || manager) && !client'])

