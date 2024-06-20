import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import {
	CreateCanvasDatumDto,
	CreateDeltaDatumDto,
	CreateLoggingDto,
	CreateNotificationDto,
	CreateSensorDatumDto
} from './dto/jsonData.dto'

@Injectable()
export class RabbitmqService {
	constructor(
		@Inject('RABBITMQ_SERVICE')
		private readonly client: ClientProxy
	) {}

	async sendSensorData(message: CreateSensorDatumDto) {
		await firstValueFrom(this.client.emit('sensorData', message))
		return 'Sensor data sent'
	}

	async sendCanvasData(message: CreateCanvasDatumDto) {
		await firstValueFrom(this.client.emit('canvasData', message))
		return 'Canvas data sent'
	}

	async sendDeltaData(message: CreateDeltaDatumDto) {
		await firstValueFrom(this.client.emit('deltaData', message))
		return 'Delta data sent'
	}

	async sendLogging(message: CreateLoggingDto) {
		await firstValueFrom(this.client.emit('logging', message))
		return 'Logging sent'
	}

	async sendNotification(message: CreateNotificationDto) {
		await firstValueFrom(
			this.client.emit('notification', message)
		)
		return 'Notification sent'
	}
}
