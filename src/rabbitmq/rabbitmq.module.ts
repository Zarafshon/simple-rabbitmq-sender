import { Module } from '@nestjs/common'
import { RabbitmqService } from './rabbitmq.service'
import { RabbitmqController } from './rabbitmq.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
	controllers: [RabbitmqController],
	providers: [RabbitmqService],
	imports: [
		ClientsModule.register([
			{
				name: 'RABBITMQ_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqp://localhost:5672'],
					queue: 'jsonData'
				}
			}
		])
	]
})
export class RabbitmqModule {}
