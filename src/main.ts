import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
	DocumentBuilder,
	SwaggerCustomOptions,
	SwaggerModule
} from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express/interfaces'

async function start() {
	const PORT = process.env.PORT || 8001
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule
	)

	const swaggerConfig = new DocumentBuilder()
		.setTitle(`Documentation of ZARAFSHON SIMPLE API VERSION 1`)
		.setDescription('API Configuration')
		.setVersion('1.0.0')
		.addCookieAuth()
		.addBearerAuth()
		.build()
	const customOptions: SwaggerCustomOptions = {
		swaggerOptions: {
			persistAuthorization: true,
			docExpansion: 'none',
			layout: 'StandaloneLayout'
		},
		customSiteTitle: `Swagger UI | ZARAFSHON`,
		useGlobalPrefix: true
	}

	app.useGlobalPipes(new ValidationPipe())
	app.setGlobalPrefix('/api/v1')
	app.use((req, res, next) => {
		process.env.NODE_ENV === 'development' &&
			console.log(req.method, req.url)
		res.header('X-Powered-By', 'ZARAFSHON')
		res.header('X-Author', '@mielpl - Abdul Azeez')
		res.header('X-App-Version', '1.0.0')
		next()
	})

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('/docs', app, document, customOptions)

	app.use(cookieParser())
	app.use(compression())
	app.enableCors({
		credentials: true,
		origin: true
	})

	await app.listen(PORT, () => {
		console.log(
			`Server started at PORT ${PORT} in ${process.env.NODE_ENV} mode`
		)
	})
}
start()
