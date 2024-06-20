import {
	Controller,
	HttpCode,
	Post,
	Body,
	UseGuards,
	Req
} from '@nestjs/common'
import { RabbitmqService } from './rabbitmq.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import {
	CreateCanvasDatumDto,
	CreateSensorDatumDto,
	CreateDeltaDatumDto,
	CreateLoggingDto,
	CreateNotificationDto
} from './dto/jsonData.dto'
import { Base64Guard, ReqCarrier } from './guards/base64.guard'

@ApiTags('AMQP')
@Controller('rabbit')
@ApiBearerAuth()
@UseGuards(Base64Guard)
export class RabbitmqController {
	count = 0
	constructor(private readonly rabbitmqService: RabbitmqService) {
		this.count = 0
	}

	@Post('/sensorData')
	@HttpCode(200)
	async sendSensorData(
		@Req() { carrier }: ReqCarrier,
		@Body() sensorData: CreateSensorDatumDto
	) {
		return await this.rabbitmqService.sendSensorData({
			...sensorData,
			carrierId: carrier.id
		})
	}

	@Post('/canvas-data')
	@HttpCode(200)
	async sendCanvasData(
		@Req() { carrier }: ReqCarrier,
		@Body() canvasData: CreateCanvasDatumDto
	) {
		return await this.rabbitmqService.sendCanvasData({
			...canvasData,
			carrierId: carrier.id
		})
	}

	@Post('/delta-data')
	@HttpCode(200)
	async sendDeltaData(
		@Req() { carrier }: ReqCarrier,
		@Body() deltaData: CreateDeltaDatumDto
	) {
		return await this.rabbitmqService.sendDeltaData({
			...deltaData,
			carrierId: carrier.id
		})
	}

	@Post('/logging')
	@HttpCode(200)
	async sendLogging(
		@Req() { carrier }: ReqCarrier,
		@Body() logging: CreateLoggingDto
	) {
		return await this.rabbitmqService.sendLogging({
			...logging,
			carrierId: carrier.id
		})
	}

	@Post('/notification')
	@HttpCode(200)
	async sendNotification(
		@Body() notification: CreateNotificationDto
	) {
		return await this.rabbitmqService.sendNotification(
			notification
		)
	}
}
