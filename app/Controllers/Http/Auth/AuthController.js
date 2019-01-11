'use strict'
const User = use('App/Models/User')
const Role = use('Role')
const Database = use('Database')
class AuthController {
	async register({request, response}){
		try{
			const trx = await Database.beginTransaction()
			const {name, surname, email, password } = request.all()

			const user = await User.create({name, surname, email, password}, trx)

			const UserRole = await Role.findBy('slug','client')

			await user.roles().attach([UserRole.id], null, trx);
			await trx.commit()
			return response.status(201).send({data:user.toJSON() })
		}catch(e){
			await trx.rollback()
			return response.status(400).send({
				message:'incorrect data',
				error: e.message 
			})

		}
		
	}

	async login ({request, response, auth}){
		const { email, password } = request.all()
		const user = await auth.withRefreshToken().attempt(email,password)
		return response.status(200).send({data: user })
	}

	async refresh ({request, response, auth}){
		const refresh_token = request.input('refresh_token')

		if(!refresh_token){
			const refresh_token = request.header('refresh_token')
		}
		const user = await auth.newRefreshToken().generateForRefreshToken(refresh_token)
		return response.status(200).send({data: user })
	}

	async logout ({request, response, auth}){
		const refresh_token = request.input('refresh_token')

		if(!refresh_token){
			const refresh_token = request.header('refresh_token')
		}
		const user = await auth.authenticator('jwt').revokeTokens([refresh_token], true)
		return response.status(200).send({data: 'Logout success' })
	}
}

module.exports = AuthController
